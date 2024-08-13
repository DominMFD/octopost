﻿import { ReactNode } from 'react';

import classNames from 'classnames';

import { Account } from '~services/api/accounts/accounts.types';
import { useSocialMediaStore } from '~stores/useSocialMediaStore/useSocialMediaStore';

import scss from './Tabs.module.scss';

import { Tab, TabId } from '../Tabber.types';
import { TabsProps } from './Tabs.types';

function Tabs(props: TabsProps): ReactNode {
  const { socialMedias } = useSocialMediaStore();

  const tabClasses = (id: TabId): string =>
    classNames(scss.tab, id === props.currentTab.id && scss.active);

  const renderSocialMediaIcon = (account: Account): ReactNode =>
    socialMedias.get(account.socialMediaId)?.icon;

  const renderTabs = (tabId: TabId, tab: Tab): ReactNode => (
    <div
      className={tabClasses(tabId)}
      key={tabId}
      onClick={() => props.onChangeTab(tab, tabId)}
    >
      {renderSocialMediaIcon(tab.account as Account)}
      <span className={scss.tabTitle}>{tab.account.userName}</span>
    </div>
  );

  return (
    <div className={scss.tabsContainer}>
      {Object.entries(props.tabs).map(([tabId, tab]) =>
        renderTabs(tabId as TabId, tab)
      )}
    </div>
  );
}

export default Tabs;
