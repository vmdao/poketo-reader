// @flow

import React, { Component } from 'react';

import Icon from '../components/icon';
import Panel from '../components/panel';
import ReaderChapterPicker from '../components/reader-chapter-picker';
import ReaderChapterLink from '../components/reader-chapter-link';
import utils from '../utils';

import type { Collection, Chapter } from '../types';

type Props = {
  chapter: Chapter,
  collection: ?Collection,
  onChapterSelectChange: (e: SyntheticInputEvent<HTMLSelectElement>) => void,
  lastReadAt?: number,
  seriesChapters: Chapter[],
};

type State = {
  showingPanel: boolean,
};

export default class ReaderNavigation extends Component<Props, State> {
  state = {
    showingPanel: false,
  };

  handlePickerClick = () => {
    this.setState({ showingPanel: true });
  };

  handlePickerPanelClose = () => {
    this.setState({ showingPanel: false });
  };

  handleChapterClick = (chapter: Chapter) => {
    this.props.onChapterSelectChange(chapter);
    this.handlePickerPanelClose();
  };

  scrollRef = React.createRef();

  renderPickerPanel() {
    const { chapter, lastReadAt, seriesChapters } = this.props;

    if (this.state.showingPanel === false) {
      return null;
    }

    return (
      <Panel.Transition>
        <Panel
          onRequestClose={this.handlePickerPanelClose}
          scrollRef={this.scrollRef}>
          <div
            ref={this.scrollRef}
            style={{
              overflowY: 'scroll',
              WebkitOverflowScrolling: 'touch',
              maxHeight: '60vh',
            }}>
            <div className="pt-2 pb-4">
              <ReaderChapterPicker
                activeChapterId={chapter.id}
                seriesChapters={seriesChapters}
                lastReadAt={lastReadAt}
                onChapterClick={this.handleChapterClick}
              />
            </div>
          </div>
        </Panel>
      </Panel.Transition>
    );
  }

  render() {
    const { chapter, collection, seriesChapters } = this.props;

    const chapterIndex = seriesChapters.findIndex(c => c.id === chapter.id);
    const previousChapter = seriesChapters[chapterIndex + 1] || null;
    const nextChapter = seriesChapters[chapterIndex - 1] || null;

    const chapterLabel = utils.getChapterLabel(chapter, true);
    const chapterTitle = utils.getChapterTitle(chapter);

    return (
      <nav className="p-relative c-white x xa-center xj-spaceBetween mw-500 mh-auto pv-2 ph-3">
        <div className="z-2">
          <ReaderChapterLink
            collectionSlug={collection && collection.slug}
            chapter={previousChapter}>
            <Icon name="direct-left" />
          </ReaderChapterLink>
          <Panel.TransitionGroup>
            {this.renderPickerPanel()}
          </Panel.TransitionGroup>
        </div>
        <a
          className="PillLink pv-2 ph-3 d-inlineBlock c-white c-pointer ta-center"
          style={{ lineHeight: '1.25' }}
          onClick={this.handlePickerClick}>
          <div className="x xa-center xj-center" style={{ lineHeight: '24px' }}>
            <span className="ml-1 mr-2">{chapterLabel}</span>
            <Icon name="direct-down" size={18} iconSize={18} />
          </div>
          {chapterTitle && (
            <div className="mt-1 fs-12 o-50p">{chapterTitle}</div>
          )}
        </a>
        <div className="z-2">
          <ReaderChapterLink
            collectionSlug={collection && collection.slug}
            chapter={nextChapter}>
            <Icon name="direct-right" />
          </ReaderChapterLink>
        </div>
      </nav>
    );
  }
}
