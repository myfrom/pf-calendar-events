import { PolymerElement, html } from '@polymer/polymer';
import moment from 'moment';

var _template = html`
<style>
    :host {
        display: block;
        height: 720px;
        width: 420px;
        color: white;
    }

    *,
    *:before,
    *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    
    #calendar.material-calendar {
        font-family: var(--pf-calendar-font, 'Roboto Condensed', sans-serif);
        background: var(--pf-calendar-bg-color, #fff);
    }

    #calendar {
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        width: 100%;
        margin: 0;
        height: 100%;
        overflow: hidden;
        font-family: var(--pf-calendar-font, 'HelveticaNeue-UltraLight', 'Helvetica Neue UltraLight', 'Helvetica Neue', Arial, Helvetica, sans-serif);
        background: var(--pf-calendar-bg-color, #4A4A4A);
    }

    .classic-calendar .header {
        height:  var(--pf-calendar-header-height,50px);
        width: 100%;
        background: var(--pf-calendar-header-background, rgba(66, 66, 66, 1));
        text-align: center;
        position: relative;
        z-index: 2;
    }
    .material-calendar .header {
        height: var(--pf-calendar-header-height, 111px);
        width: 100%;
        background: var(--pf-calendar-header-background, var(--primary-color, #009688));
        text-align: center;
        position: relative;
        z-index: 2;
    }

    .classic-calendar .header h1 {
        margin: 0;
        padding: 0;
        font-size: var(--pf-calendar-month-title-font-size, 20px);
        line-height: var(--pf-calendar-month-title-line-height, 50px);
        font-weight: var(--pf-calendar-month-title-font-weight, 100);
        letter-spacing: var(--pf-calendar-month-title-letter-spacing, 1px);
        color: var(--pf-calendar-month-title-color, #000);
    }
    .material-calendar .header h1 {
        margin: 0;
        padding: 0;
        font-size:var(--pf-calendar-month-title-font-size, 36px);
        line-height: var(--pf-calendar-month-title-line-height, 113px);
        font-weight: var(--pf-calendar-month-title-font-weight, 100);
        letter-spacing: var(--pf-calendar-month-title-letter-spacing, 1px);
        color: var(--pf-calendar-month-title-color, var(--light-text-primary, #fff));
    }

    .left,
    .right {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        top: 50%;
        margin-top: -7.5px;
        cursor: pointer;
    }

    .classic-calendar  .left {
        border-width: 7.5px 10px 7.5px 0;
        border-color: transparent var(--pf-calendar-header-arrow-color, rgba(160, 159, 160, 1)) transparent transparent;
        left: 20px;
    }

    .classic-calendar  .right {
        border-width: 7.5px 0 7.5px 10px;
        border-color: transparent transparent transparent var(--pf-calendar-header-arrow-color, rgba(160, 159, 160, 1));
        right: 20px;
    }
    .material-calendar  .left {
        border-width: 7.5px 10px 7.5px 0;
        border-color: transparent var(--pf-calendar-header-arrow-color, #fff) transparent transparent;
        left: 20px;
    }

    .material-calendar .right {
        border-width: 7.5px 0 7.5px 10px;
        border-color: transparent transparent transparent var(--pf-calendar-header-arrow-color, #fff);
        right: 20px;
    }

    .month {
        /*overflow: hidden;*/
        opacity: 0;
        overflow-y: auto;
        position: absolute;
        right: 0;
        left: 0;
        top: var(--pf-calendar-header-height, 50px);
        bottom: 30px;
    }

    .material-calendar .month {
        top: var(--pf-calendar-header-height, 111px);
    }

    .month.new {
        -webkit-animation: fadeIn 1s ease-out;
        -moz-animation:  fadeIn 1s ease-out;
        animation:  fadeIn 1s ease-out;
        opacity: 1;
    }

    .month.in.next {
        -webkit-animation: moveFromTopFadeMonth .4s ease-out;
        -moz-animation: moveFromTopFadeMonth .4s ease-out;
        animation: moveFromTopFadeMonth .4s ease-out;
        opacity: 1;
    }

    .month.out.next {
        -webkit-animation: moveToTopFadeMonth .4s ease-in;
        -moz-animation: moveToTopFadeMonth .4s ease-in;
        animation: moveToTopFadeMonth .4s ease-in;
        opacity: 1;
    }

    .month.in.prev {
        -webkit-animation: moveFromBottomFadeMonth .4s ease-out;
        -moz-animation: moveFromBottomFadeMonth .4s ease-out;
        animation: moveFromBottomFadeMonth .4s ease-out;
        opacity: 1;
    }

    .month.out.prev {
        -webkit-animation: moveToBottomFadeMonth .4s ease-in;
        -moz-animation: moveToBottomFadeMonth .4s ease-in;
        animation: moveToBottomFadeMonth .4s ease-in;
        opacity: 1;
    }

    .week {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: 75px 120px;
    }

    .details {
        grid-column-start: 1;
        grid-column-end: end;
    }

    .classic-calendar  .day {
        display: inline-block;
        padding: 10px;
        text-align: center;
        vertical-align: top;
        cursor: pointer;
        color: var(--pf-calendar-day-color, black);
        position: relative;
        /* z-index: 100; */
    }

    .material-calendar  .day {
        display: inline-block;
        padding: 10px;
        text-align: center;
        vertical-align: top;
        cursor: pointer;
        color: var(--pf-calendar-day-color, var(--dark-text-primary, black));
        position: relative;
        /* z-index: 100; */
    }

    .classic-calendar .day.other {
        color: var(--pf-calendar-other-day-color, rgba(255, 255, 255, .3));
    }

    .classic-calendar .day.today {
        color: var(--pf-calendar-today-color, rgba(156, 202, 235, 1));
    }

    .classic-calendar .day-name {
        font-size: 9px;
        text-transform: uppercase;
        margin-bottom: 5px;
        color: var(--pf-calendar-day-name-color, rgba(255, 255, 255, .5));
        letter-spacing: .7px;
    }
    .material-calendar .day.other {
        color: var(--pf-calendar-other-day-color, var(--dark-text-secondary, rgba(255, 255, 255, .3)));
    }

    .material-calendar .day.today {
        color: var(--pf-calendar-today-color, var(--primary-color, #009688));
    }

    .material-calendar .day-name {
        font-size: 9px;
        text-transform: uppercase;
        margin-bottom: 5px;
        color: var(--pf-calendar-day-name-color, var(--dark-divider-color));
        letter-spacing: .7px;
    }

    .day-number {
        font-size: 24px;
        letter-spacing: 1.5px;
    }

    .day .day-events {
        list-style: none;
        margin-top: 3px;
        text-align: center;
        height: 12px;
        line-height: 6px;
        overflow: hidden;
    }

    .day .day-events span {
        vertical-align: top;
        display: inline-block;
        padding: 0;
        margin: 0;
        width: 5px;
        height: 5px;
        line-height: 5px;
        margin: 0 1px;
    }

    .blue {
        background: rgba(156, 202, 235, 1);
    }

    .orange {
        background: rgba(247, 167, 0, 1);
    }

    .green {
        background: rgba(153, 198, 109, 1);
    }

    .yellow {
        background: rgba(249, 233, 0, 1);
    }

    .classic-calendar .details {
        position: relative;
        background: var(--pf-calendar-event-detail-bg, rgba(164, 164, 164, 1));
        border-radius: 4px;
    }
    .material-calendar .details {
        position: relative;
        background: var(--pf-calendar-event-detail-bg, var(--primary-color, #009688));
        border-radius: 4px;
    }

    .details.in {
        -webkit-animation: moveFromTopFade .5s ease both;
        -moz-animation: moveFromTopFade .5s ease both;
        animation: moveFromTopFade .5s ease both;
    }

    .details.out {
        -webkit-animation: moveToTopFade .5s ease both;
        -moz-animation: moveToTopFade .5s ease both;
        animation: moveToTopFade .5s ease both;
    }

    .classic-calendar   .arrow {
        position: absolute;
        top: -5px;
        left: 50%;
        margin-left: -2px;
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 0 5px 5px 5px;
        border-color: transparent transparent var(--pf-calendar-event-detail-bg, rgba(164, 164, 164, 1)) transparent;
        transition: all 0.7s ease;
    }
    .material-calendar   .arrow {
        position: absolute;
        top: -5px;
        left: 50%;
        margin-left: -2px;
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 0 5px 5px 5px;
        border-color: transparent transparent var(--pf-calendar-event-detail-bg, var(--primary-color, #009688)) transparent;
        transition: all 0.7s ease;
    }

    .events {
        height: 100%;
        padding: 7px 0;
        overflow-y: auto;
        overflow-x: hidden;
    }


    .events.in {
        -webkit-animation: fadeIn .3s ease both;
        -moz-animation: fadeIn .3s ease both;
        animation: fadeIn .3s ease both;
    }

    .events.in {
        -webkit-animation-delay: .3s;
        -moz-animation-delay: .3s;
        animation-delay: .3s;
    }

    .details.out .events {
        -webkit-animation: fadeOutShrink .4s ease both;
        -moz-animation: fadeOutShink .4s ease both;
        animation: fadeOutShink .4s ease both;
    }

    .events.out {
        -webkit-animation: fadeOut .3s ease both;
        -moz-animation: fadeOut .3s ease both;
        animation: fadeOut .3s ease both;
    }

    .event {
        font-size: 16px;
        line-height: 22px;
        letter-spacing: .5px;
        padding: 2px 16px;
        vertical-align: top;
        margin:5px;
    }

    .dltEvent {
        width:25px;
        height:25px;

        margin:2px;
        /*width of the image*/
        background: url(/images/img_dlt.png) no-repeat top left;
        float: right;
        cursor: pointer;
        display: var(--pf-calendar-deletebutton-disply, inline);
    }

    .editEvent {
        width:25px;
        height:25px;

        margin:2px;
        /*width of the image*/
        background: url(/images/img_edit.png) left top no-repeat;
        float: right;
        cursor: pointer;
        display: var(--pf-calendar-editbutton-disply, inline);
    }


    .event-category {
        height: 10px;
        width: 10px;
        display: inline-block;
        margin: 6px 0 0;
        vertical-align: top;

    }

    .classic-calendar  .event span {
        display: inline-block;
        padding: 0 0 0 7px;
        cursor: pointer;
        color: var(--pf-calendar-event-color,black);
    }
    .classic-calendar  .numberCircle {
        border-radius: 50%;
        behavior: url(PIE.htc); /* remove if you don't care about IE8 */
        margin: 0 auto;
        width: 36px;
        height: 36px;
        background: var(--pf-calendar-selected-date-bg,black);
        border: 2px solid transparent;
        color: var(--pf-calendar-selected-date-color,#fff);
        text-align: center;
        font-size: 24px;
        letter-spacing: 1.5px;
    }
    .material-calendar .event span {
        display: inline-block;
        padding: 0 0 0 7px;
        cursor: pointer;
        color: var(--pf-calendar-event-color,#fff);
    }
    .material-calendar  .numberCircle {
        border-radius: 50%;
        behavior: url(PIE.htc); /* remove if you don't care about IE8 */
        margin: 0 auto;
        width: 36px;
        height: 36px;
        background: var(--pf-calendar-selected-date-bg,#009688);
        border: 2px solid transparent;
        color: var(--pf-calendar-selected-date-color,#fff);
        text-align: center;
        font-size: 24px;
        letter-spacing: 1.5px;

    }
    .addbutton {
        margin: 8px 16px;
        width:25px;
        height:25px;

        /*width of the image*/
        background: url(/images/ic_add.png) no-repeat top left;


        display: var(--pf-calendar-addbutton-disply, inline-block);

        cursor: pointer;
        border: none;
        outline: none;

    }

    .classic-calendar .legend {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30px;
        background: var(--pf-calendar-legend-bg, rgba(60, 60, 60, 1));
        line-height: 30px;
    }
    .material-calendar .legend .cat {
        position: relative;
        display: inline-block;
        margin: 0px 3px;
    }
    .material-calendar .legend .cat .event-category {
        margin-top: 10px;
        width: 10px;

        margin-left: 5px;
    }
    .classic-calendar .legend .cat {
        position: relative;
        display: inline-block;
        margin: 0px 3px;
    }
    .classic-calendar .legend .cat .event-category {
        margin-top: 10px;
        width: 10px;

        margin-left: 5px;
    }

    .material-calendar .legend {
        color: inherit;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30px;
        background: var(--pf-calendar-bg-color, var(--primary-color, #009688));
        line-height: 30px;
    }


    .entry {
        position: relative;
        padding: 0 0 0 8px;
        font-size: 13px;

        background: transparent;
    }

    .entry.blue:after {
        background: rgba(156, 202, 235, 1);
    }

    .entry.orange:after {
        background: rgba(247, 167, 0, 1);
    }

    .entry.green:after {
        background: rgba(153, 198, 109, 1);
    }

    .entry.yellow:after {
        background: rgba(249, 233, 0, 1);
    }
    /* Animations are cool!  */

    @-webkit-keyframes moveFromTopFade {
        from {
            opacity: .3;
            height: 0px;
            margin-top: 0px;
            -webkit-transform: translateY(-100%);
        }
    }

    @-moz-keyframes moveFromTopFade {
        from {
            height: 0px;
            margin-top: 0px;
            -moz-transform: translateY(-100%);
        }
    }

    @keyframes moveFromTopFade {
        from {
            height: 0px;
            margin-top: 0px;
            transform: translateY(-100%);
        }
    }

    @-webkit-keyframes moveToTopFade {
        to {
            opacity: .3;
            height: 0px;
            margin-top: 0px;
            opacity: 0.3;
            -webkit-transform: translateY(-100%);
        }
    }

    @-moz-keyframes moveToTopFade {
        to {
            height: 0px;
            -moz-transform: translateY(-100%);
        }
    }

    @keyframes moveToTopFade {
        to {
            height: 0px;
            transform: translateY(-100%);
        }
    }

    @-webkit-keyframes moveToTopFadeMonth {
        to {
            opacity: 0;
            -webkit-transform: translateY(-30%) scale(.95);
        }
    }

    @-moz-keyframes moveToTopFadeMonth {
        to {
            opacity: 0;
            -moz-transform: translateY(-30%);
        }
    }

    @keyframes moveToTopFadeMonth {
        to {
            opacity: 0;
            -moz-transform: translateY(-30%);
        }
    }

    @-webkit-keyframes moveFromTopFadeMonth {
        from {
            opacity: 0;
            -webkit-transform: translateY(30%) scale(.95);
        }
    }

    @-moz-keyframes moveFromTopFadeMonth {
        from {
            opacity: 0;
            -moz-transform: translateY(30%);
        }
    }

    @keyframes moveFromTopFadeMonth {
        from {
            opacity: 0;
            -moz-transform: translateY(30%);
        }
    }

    @-webkit-keyframes moveToBottomFadeMonth {
        to {
            opacity: 0;
            -webkit-transform: translateY(30%) scale(.95);
        }
    }

    @-moz-keyframes moveToBottomFadeMonth {
        to {
            opacity: 0;
            -webkit-transform: translateY(30%);
        }
    }

    @keyframes moveToBottomFadeMonth {
        to {
            opacity: 0;
            -webkit-transform: translateY(30%);
        }
    }

    @-webkit-keyframes moveFromBottomFadeMonth {
        from {
            opacity: 0;
            -webkit-transform: translateY(-30%) scale(.95);
        }
    }

    @-moz-keyframes moveFromBottomFadeMonth {
        from {
            opacity: 0;
            -webkit-transform: translateY(-30%);
        }
    }

    @keyframes moveFromBottomFadeMonth {
        from {
            opacity: 0;
            -webkit-transform: translateY(-30%);
        }
    }

    @-webkit-keyframes fadeIn {
        from {
            opacity: 0;
        }
    }

    @-moz-keyframes fadeIn {
        from {
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
    }

    @-webkit-keyframes fadeOut {
        to {
            opacity: 0;
        }
    }

    @-moz-keyframes fadeOut {
        to {
            opacity: 0;
        }
    }

    @keyframes fadeOut {
        to {
            opacity: 0;
        }
    }

    @-webkit-keyframes fadeOutShink {
        to {
            opacity: 0;
            padding: 0px;
            height: 0px;
        }
    }

    @-moz-keyframes fadeOutShink {
        to {
            opacity: 0;
            padding: 0px;
            height: 0px;
        }
    }

    @keyframes fadeOutShink {
        to {
            opacity: 0;
            padding: 0px;
            height: 0px;
        }
    }

</style>

<div class$="{{_getClasses('k')}}" id="calendar"></div>
`;

/**
 * ### Styling
 * 
 * The following custom properties and mixins are available for styling:
 * 
 * Custom property                         | Description                             | Default
 * ----------------------------------------|-----------------------------------------|-------------------------
 * `--pf-calendar-bg-color`                |  Calendar background                    | #4A4A4A
 * `--pf-calendar-font`                    |  Calendar font                          | 'Helvetica Neue UltraLight'
 * `--pf-calendar-header-background`       |  Calendar Header Background             | rgba(66, 66, 66, 1)
 * `--pf-calendar-header-height`           |  Calendar Header height                 | 50px
 * `--pf-calendar-month-title-font-size`   |   Font size of  month on header         | 20px
 * `--pf-calendar-month-title-line-height` |  Calendar Header title line Height      | rgba(66, 66, 66, 1)
 * `--pf-calendar-month-title-font-weight` | Calendar Header title font weight       | 100
 * `--pf-calendar-month-title-letter-spacing` | Calendar Header title letter spacing | 1px
 * `--pf-calendar-header-arrow-color`      |  Next/previous Month arrow color        | rgba(160, 159, 160, 1)
 * `--pf-calendar-month-title-color`       |  Month Title color                      | #000
 * `--pf-calendar-day-color`               |  color of date                          | #000
 * `--pf-calendar-other-day-color`         |  color of previous and next month date  | rgba(255, 255, 255, .3)
 * `--pf-calendar-today-color`             |  Current date Color                     | rgba(156` 202, 235, 1)
 * `--pf-calendar-selected-date-bg`        |  Selected Date Background color         | #000
 * `--pf-calendar-selected-date-color`     |  Selected Date color                    | #fff
 * `--pf-calendar-day-name-color`          |  Name of Day color e.g(MON,TUE,WED)     | rgba(255` 255, 255, .5)
 * `--pf-calendar-event-detail-bg`         |  Event box background                   | rgba(164, 164, 164, 1)
 * `--pf-calendar-event-color`             |  color of label "Event"                 | #000
 * `--pf-calendar-addevent-button-bg-color'|  Add Event Button color                 | rgba(164, 164, 164, 1)
 * `--pf-calendar-addevent-button-text-color`| Add Event text color                  | #fff
 * `--pf-calendar-addevent-button-hover-color`|  Add event button hover color        | rgba(170, 170, 170, 1)
 * `--pf-calendar-addbutton-disply`        |  to hide button set "none"              | inline-block
 * `--pf-calendar-deletebutton-disply`     |  to hide button set "none"              | inline
 * `--pf-calendar-editbutton-disply`       |  to hide button set "none"              | inline
 * `--pf-calendar-legend-bg`               |  Background color of legend bar         | rgba(60, 60, 60, 1)
 * 
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PFCalendar extends PolymerElement {
  static get template() { return _template; }
  static get is() { return 'pf-calendar-events'; }
  static get properties() {
    return {

      data: {
        type: Object


      },
      calendar: {
        type: Object
      },
      today: {
        type: Object
      },

      date: {
        type: Object,


      },
      calendarstyle: {
        type: String,
        value: "material-calendar"


      }
    };
  }
  static get observers() {
    return [
      '_drawCalendar(data.*)'
    ]
  }

  _drawCalendar() {
    this.month = null
    this.header = null
    if (this.date) {
      this.today = moment(parseInt(this.date));
    } else {
      this.today = moment();
    }
    this.$.calendar.innerHTML = '';
    if (!this.data) {
      this.data = JSON.parse('[{ "eventName": "Lunch Meeting w/ Mark", "category": "Work", "color": "orange","date":"14913220913940" }]');
    }

    this.calendar = this._Calendar(this.$.calendar,
      this.data);
  }
  _Calendar(selector, event) {

    this.el = selector;
    this.events = event;
    if (this.date) {
      this.current = moment(parseInt(this.date)).date(1);
    } else {
      this.current = moment().date(1);
    }

    this._draw();
    var current = document.querySelector('.today');
    if (current) {
      var self = this;
      window.setTimeout(function () {
        self._openDay(current);
      }, 500);
    }
  }
  _draw() {

    //Create Header
    this._drawHeader();

    //Draw Month
    this._drawMonth();

    this._drawLegend();

  }

  _drawHeader() {

    var self = this;
    if (!this.header) {
      //Create the header elements
      this.header = this._createElement('div', 'header');
      this.header.className = 'header';

      this.calendarTitle = this._createElement('h1');

      var right = this._createElement('div', 'right');
      right.addEventListener('click', function () {
        self._nextMonth();
      });

      var left = this._createElement('div', 'left');
      left.addEventListener('click', function () {
        self._prevMonth();
      });

      //Append the Elements
      this.header.appendChild(this.calendarTitle);
      this.header.appendChild(right);
      this.header.appendChild(left);
      this.el.appendChild(this.header);
    }

    this.calendarTitle.innerHTML = this.current.format('MMMM YYYY');

  }

  _drawMonth() {

    var self = this;
    /*
     this.events.forEach(function (ev) {
     ev.date = moment(parseInt(ev.date))

     //    ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
     });
     */

    if (this.month) {
      this.oldMonth = this.month;
      this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
      this.oldMonth.addEventListener('webkitAnimationEnd', function () {
        self.oldMonth.parentNode.removeChild(self.oldMonth);
        self.month = self._createElement('div', 'month');
        self._backFill();
        self._currentMonth();
        self._fowardFill();
        self.el.appendChild(self.month);
        window.setTimeout(function () {
          self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
        }, 16);
      });
    } else {
      this.month = this._createElement('div', 'month');
      this.el.appendChild(this.month);
      this._backFill();
      this._currentMonth();
      this._fowardFill();
      this.month.className = 'month new';
    }
  }


  _backFill() {

    var clone = this.current.clone();
    var dayOfWeek = clone.day();

    if (!dayOfWeek) {
      return;
    }

    clone.subtract('days', dayOfWeek + 1);

    for (var i = dayOfWeek; i > 0; i--) {
      this._drawDay(clone.add('days', 1));
    }
  }

  _fowardFill() {

    var clone = this.current.clone().add('months', 1).subtract('days', 1);
    var dayOfWeek = clone.day();

    if (dayOfWeek === 6) {
      return;
    }

    for (var i = dayOfWeek; i < 6; i++) {
      this._drawDay(clone.add('days', 1));
    }
  }


  _currentMonth() {

    var clone = this.current.clone();

    while (clone.month() === this.current.month()) {
      this._drawDay(clone);
      clone.add('days', 1);
    }
  }


  _getWeek(day) {

    if (!this.week || day.day() === 0) {
      this.week = this._createElement('div', 'week');
      this.month.appendChild(this.week);
    }
  }


  _drawDay(day) {

    var self = this;
    this._getWeek(day);

    //Outer Day
    var outer = this._createElement('div', this._getDayClass(day));
    if (day.month() == this.current.month()) {
      outer.addEventListener('click', function () {
        self._openDay(this);
        var currentSelected = self.shadowRoot.querySelector('.numberCircle');
        if (currentSelected) {
          currentSelected.className = "day-number"
        }
        var dayNum = outer.querySelectorAll('.day-number')[0]
        dayNum.className = "numberCircle"
      });
    }

    //Day Name
    var name = this._createElement('div', 'day-name', day.format('ddd'));

    //Day Number
    var number = this._createElement('div', 'day-number', day.format('DD'));


    //Events
    var events = this._createElement('div', 'day-events');
    this._drawEvents(day, events);

    outer.appendChild(name);
    outer.appendChild(number);
    outer.appendChild(events);
    this.week.appendChild(outer);
  }

  _drawEvents(day, element) {
    var self = this;
    if (day.month() === this.current.month()) {
      var todaysEvents = this.events.reduce(function (memo, ev) {
        //  ev.date = ev.date.replace(/['"]+/g, '');
        var dateType = typeof ev.date
        if (dateType == "string") {


          ev.date = JSON.parse(ev.date);
          var dateType = typeof ev.date
        }
        if (dateType == "number") {
          ev.date = moment(parseInt(ev.date))
          //      ev.isDateFormat=true
        }
        if (ev.date.isSame(day, 'day')) {
          memo.push(ev);
        }
        return memo;
      }, []);

      todaysEvents.forEach(function (ev) {
        var evSpan = self._createColorElement('span', 'new', ev.color);
        element.appendChild(evSpan);
      });
    }
  }

  _getDayClass(day, newClass) {
    var classes = ['day'];
    if (day.month() !== this.current.month()) {
      classes.push('other');
    } else if (this.today.isSame(day, 'day')) {
      classes.push('today');
    }
    if (newClass) {
      classes.push(newClass)
    }
    return classes.join(' ');
  }
  _daySelected(d, eve) {
    var mday = d;
    var mevent = event
    this.dispatchEvent(new CustomEvent('date-select', { detail: { date: d, events: eve } }));
  }
  _openDay(el) {
    var details, arrow;
    var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
    var day = this.current.clone().date(dayNumber);

    //  var currentOpened = document.querySelector('.details');
    var currentOpened = this.shadowRoot.querySelector('.details');
    //Check to see if there is an open detais box on the current row
    if (currentOpened && currentOpened.parentNode === el.parentNode) {
      details = currentOpened;
      arrow = this.shadowRoot.querySelector('.arrow');
      //arrow = document.querySelector('.arrow');
    } else {
      //Close the open events on differnt week row
      //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
      if (currentOpened) {
        currentOpened.addEventListener('oanimationend', function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('msAnimationEnd', function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('animationend', function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.className = 'details out';
      }

      //Create the Details Container
      details = this._createElement('div', 'details in');

      //Create the arrow
      var arrow = this._createElement('div', 'arrow');

      //Create the event wrapper

      details.appendChild(arrow);
      el.parentNode.appendChild(details);
    }

    var todaysEvents = this.events.reduce(function (memo, ev) {
      if (ev.date.isSame(day, 'day')) {
        memo.push(ev);
      }
      return memo;
    }, []);
    this._daySelected(day, todaysEvents);
    this._renderEvents(day, todaysEvents, details);

    arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';
  }
  _selectEvent(ev) {
    var mEv = ev;
    this.dispatchEvent(new CustomEvent('event-select', { detail: { event: ev } }));

  }
  _editEvent(ev) {
    var mEv = ev;
    this.dispatchEvent(new CustomEvent('event-edit', { detail: { event: ev } }));

  } _dltEvent(ev) {
    var mEv = ev;
    this.dispatchEvent(new CustomEvent('event-delete', { detail: { event: ev } }));

  }
  _addnewEve(date) {
    var mEv = date;
    this.dispatchEvent(new CustomEvent('event-add', { detail: { date: date } }));
  }
  _renderEvents(day, events, ele) {
    var self = this;
    //Remove any events in the current details element
    var currentWrapper = ele.querySelector('.events');
    var wrapper = this._createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

    events.forEach(function (ev) {
      var div = self._createElement('div', 'event');
      var square = self._createColorElement('div', 'event-category ', ev.color);
      var span = self._createElement('span', '', ev.eventName);
      var editButton = self._createElement('div', 'editEvent', "");
      var dltButton = self._createElement('div', 'dltEvent', "");
      var editDltContainer = self._createElement('div', 'editDltContainer');
      span.addEventListener('click', function () {
        self._selectEvent(ev);
      });
      editButton.addEventListener('click', function () {
        self._editEvent(ev);
      });
      dltButton.addEventListener('click', function () {
        self._dltEvent(ev);
      });

      div.appendChild(square);
      div.appendChild(span);
      div.appendChild(editButton);
      div.appendChild(dltButton);
      wrapper.appendChild(div);
    });

    if (!events.length) {
      var div = this._createElement('div', 'event empty');
      var span = this._createElement('span', '', 'No Events');

      div.appendChild(span);
      wrapper.appendChild(div);
    }
    var addbutton = this._createElement('div', 'addbutton', '');
    addbutton.addEventListener('click', function () {
      self._addnewEve(day);
    });
    wrapper.appendChild(addbutton);
    if (currentWrapper) {
      currentWrapper.className = 'events out';
      currentWrapper.addEventListener('webkitAnimationEnd', function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('oanimationend', function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('msAnimationEnd', function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('animationend', function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
    } else {
      ele.appendChild(wrapper);
    }
  }

  _drawLegend() {
    var self = this;
    var legend = this._createElement('div', 'legend');
    var calendars = this.events.map(function (e) {
      return e.category + '|' + e.color;
    }).reduce(function (memo, e) {
      if (memo.indexOf(e) === -1) {
        memo.push(e);
      }
      return memo;
    }, []).forEach(function (e) {
      var parts = e.split('|');
      var div = self._createElement('div', 'cat');
      var evSpan = self._createColorElement('span', 'event-category', parts[1]);

      div.appendChild(evSpan);


      var entry = self._createElement('span', 'entry ', parts[0]);
      div.appendChild(entry);

      legend.appendChild(div);
    });
    this.el.appendChild(legend);
  }

  _nextMonth() {

    this.current.add('months', 1);
    this.next = true;
    this._draw();
  }

  _prevMonth() {

    this.current.subtract('months', 1);
    this.next = false;
    this._draw();
  }



  _createElement(tagName, className, innerText) {
    var ele = document.createElement(tagName);

    if (className) {
      ele.className = className;

    }
    if (innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }
  _createColorElement(tagName, className, color, innerText) {
    var ele = document.createElement(tagName);

    if (className) {
      ele.className = className;

    }
    if (innerText) {
      ele.innderText = ele.textContent = innerText;
      ele.style.background = color
    } else {

      ele.style.background = color
    }
    return ele;
  }
  _convertMillsDate(data) {


    if (!data) {

      data = JSON.parse('[{ "eventName": "Lunch Meeting w/ Mark", "category": "Work", "color": "orange","date":"14913220913940" }]');
    }
    data.forEach(function (ev) {
      if (typeof ev.date == "number") {
        ev.date = moment(parseInt(ev.date))
        //      ev.isDateFormat=true
      }
      //    ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
    });
    return data;
  }

  _getClasses(e) {
    var classes = this.calendarstyle;
    if (this.calendarstyle == "material-calendar" || this.calendarstyle == "classic-calendar") {
      classes = this.calendarstyle;
    } else {
      classes = "material-calendar"
    }
    return classes;
  }
  ready() {
    super.ready();
    this.addEventListener('date-select', e => this._handleClick(e)
    );
    this.addEventListener('event-select', e => this._handleEvent(e)
    );
    this.addEventListener('event-edit', e => this._handleEvent(e)
    );
    this.addEventListener('event-delete', e => this._handleEvent(e)
    );
    this.addEventListener('event-add', e => this._addEvent(e)
    );
  }
  _addEvent(e) {
    var event = e.detail.date
  }
  _handleEvent(e) {
    var event = e.detail.event
  }
  _handleClick(e) {
    var day = e.detail.date;
    var eve = e.detail.events;
  }

  connectedCallback() {

    super.connectedCallback();
    this._drawCalendar();




  }
  constructor() {
    super();
  }

}

window.customElements.define(PFCalendar.is, PFCalendar);