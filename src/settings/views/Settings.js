import React from 'react';

import Header from '../../components/Header';
import SectionTitle from '../../components/SectionTitle';
import { view as UserRecord } from '../userRecord';

export default class Settings extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header
          title="设置"
          lead="个性化你的心情空间。"
        />

        <div>
          <div className="container py-5 px-4">
            <SectionTitle text="你的心情足迹" />
            <UserRecord />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
