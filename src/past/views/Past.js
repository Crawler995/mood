import React from 'react';

import Header from '../../components/Header';
import { view as MoodData } from '../moodData';
import { view as MoodCard } from '../moodCard';

export default class Past extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header
          title="过去"
          lead="回到过去，你写下过的喜怒哀乐，尽收眼底。"
        />

        <div>
          <div className="container py-5 px-4">
            <MoodData />
            <MoodCard />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
