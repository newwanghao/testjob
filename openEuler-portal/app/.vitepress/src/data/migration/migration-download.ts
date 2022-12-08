export default [
  {
    name: 'x2openEuler',
    description:
      'x2openEuler工具是一款将源操作系统迁移到目标操作系统的迁移工具套件，具有批量化原地升级能力，当前支持将源OS升级至openEuler 20.03。为解决客户升级操作系统过程中人工投入大、准确率低、无法批量化处理导致整体效率低下的痛点，x2openEuler工具提供简单易用的操作界面，您可以批量添加待升级节点进行迁移分析，设计迁移方案并对兼容性问题进行迁移适配，最后对已适配的待升级节点批量升级，实现端到端的无感迁移。',
    version: '2.0.0',
    sourceLinks: [
      {
        name: '软件下载',
        softLinks: [
          {
            name: 'x86_64 ',
            link: 'https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/x86_64/Packages/x2openEuler-core-2.0.0-1.x86_64.rpm',
          },
          {
            name: 'aarch64 ',
            link: 'https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/aarch64/Packages/x2openEuler-core-2.0.0-1.aarch64.rpm',
          },
        ],
      },
      {
        name: '使用指南',
        link: 'https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/thirdparty_migration/x2openEuler-Userguide.html',
      },
      {
        name: '视频实操',
        link: 'https://www.bilibili.com/video/BV1TR4y1o7cX/?is_story_h5=false&p=1&share_from=ugc&share_medium=android&share_plat=android&share_session_id=2d0cb5be-8f2d-4271-b749-5f37452ec983&share_source=COPY&share_tag=s_i&timestamp=1665209080&unique_k=622RHPA',
      },
    ],
  },
];
