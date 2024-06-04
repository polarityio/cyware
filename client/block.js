'use strict';

polarity.export = PolarityComponent.extend({
  details: Ember.computed.alias('block.data.details'),
  timezone: Ember.computed('Intl', function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }),
  init() {
    const indicators = this.get('details.indicators');
    indicators.forEach((indicator, index) => {
      if (indicator.tlp === 'AMBER') {
        this.set(`details.indicators.${index}.tlp_class`, 'amber');
      } else if (indicator.tlp === 'GREEN') {
        this.set(`details.indicators.${index}.tlp_class`, 'green');
      } else if (indicator.tlp === 'RED') {
        this.set(`details.indicators.${index}.tlp_class`, 'red');
      } else if (indicator.tlp === 'WHITE') {
        this.set(`details.indicators.${index}.tlp_class`, 'white');
      } else if (indicator.tlp === 'NONE') {
        this.set(`details.indicators.${index}.tlp_class`, 'none');
      }

      if (indicator.analyst_score === null || indicator.analyst_score < 30) {
        this.set(`details.indicators.${index}.analyst_score_class`, 'green');
      } else if (indicator.analyst_score >= 30 && indicator.analyst_score < 70) {
        this.set(`details.indicators.${index}.analyst_score_class`, 'yellow');
      } else {
        this.set(`details.indicators.${index}.analyst_score_class`, 'red');
      }

      if (indicator.confidence_score === null || indicator.confidence_score < 30) {
        this.set(`details.indicators.${index}.confidence_score_class`, 'green');
      } else if (indicator.confidence_score >= 30 && indicator.confidence_score < 70) {
        this.set(`details.indicators.${index}.confidence_score_class`, 'yellow');
      } else {
        this.set(`details.indicators.${index}.confidence_score_class`, 'red');
      }
    });
    this._super(...arguments);
  }
});
