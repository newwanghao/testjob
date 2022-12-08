import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { FeatureInfo, GroupInfo } from '@/shared/@types/type-sig';
interface LIST_PARAMS {
  page: number;
  pageSize: number;
}
export function getSigList() {
  const baseUrl = 'https://www.openeuler.org';
  const url = `${baseUrl}/api-sig/sigs/`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
export function getCompleteList(params?: LIST_PARAMS) {
  const url = `/query/sig/info?community=openeuler&page=${params?.page}&pageSize=${params?.pageSize}&search=fuzzy`;
  return request.post(url).then((res: AxiosResponse) => res.data);
}
export function getRepoList() {
  const url = `/query/sig/repo?community=openeuler&search=fuzzy`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
export function getAllList() {
  const url = '/query/sig/info?community=openeuler&search=fuzzy';
  return request.post(url).then((res: AxiosResponse) => res.data);
}
export function getSigDetail(id: string) {
  const url = `/api/meetings/sigmeetingsdata/${id}/`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
export function getSigMember(params: object) {
  const url = '/query/sig/info';
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}
export function getSigRepositoryList(params: object) {
  const url = '/query/sig/repo/committers';
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}
export function getSalon() {
  const baseUrl = 'https://www.openeuler.org';
  const url = `${baseUrl}/api-sig/activities/`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * sig用户的个人贡献
 */
export function querySigUserContribute(params: object) {
  const url = '/query/sig/usercontribute';
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}

/**
 * 获取sig landscape
 * @returns {Promise<GroupInfo[]>}
 */
export function getSigLandscape(): Promise<GroupInfo[]> {
  const url = '/query/sig/scoreAll?community=openeuler';
  return request.get(url).then((res: AxiosResponse) => {
    const data = res.data?.data;
    const info: GroupInfo[] = [];
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.group === '' && item.feature === '') {
        continue;
      }

      if (
        !info.find((group: GroupInfo) => {
          return group.groupName === item.group;
        })
      ) {
        info.push({
          groupName: item.group,
          features: [],
        });
      }

      const groupInfo: GroupInfo | undefined = info.find((group: GroupInfo) => {
        return group.groupName === item.group;
      });

      if (
        !groupInfo?.features.find((feature: any) => {
          return feature.featureName === item.feature;
        })
      ) {
        groupInfo?.features.push({
          featureName: item.feature,
          sigs: [],
        });
      }

      const featureInfo: FeatureInfo | undefined = groupInfo?.features.find(
        (feature: FeatureInfo) => {
          return feature.featureName === item.feature;
        }
      );
      featureInfo?.sigs.push(item.sig_names);
    }
    info.sort((b: GroupInfo, a: GroupInfo) => {
      return a.features.length - b.features.length;
    });
    info.forEach((group: GroupInfo) => {
      group.features.sort((b: FeatureInfo, a: FeatureInfo) => {
        return a.sigs.length - b.sigs.length;
      });
      group.features.forEach((feature: FeatureInfo) => {
        feature.sigs.sort((b: string, a: string) => {
          return b.toLowerCase().localeCompare(a);
        });
      });
    });
    return info;
  });
}
