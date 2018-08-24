'use strict';
// A simple Timer that mimic the main features of .NET System.Timers.Timer
// Author: Meigyoku Thmn
class Timer {
   get Enabled() { return this.enable; }
   set Enabled(value) {
      if (typeof value !== 'boolean') throw new Error('The Enable property must be boolean type!');
      this.enable = value;
      if (value == true)
         this.triggerTimer();
      else this.clearCallback();
   }
   triggerTimer() {
      if (this.callbackHandler == null) {
         this.callbackHandler = setTimeout(this.elapsedCallback.bind(this), this.interval);
      }
   }
   clearCallback() {
      if (this.callbackHandler != null) clearTimeout(this.callbackHandler);
      this.callbackHandler = null;
   }
   elapsedCallback() {
      for (let callback of this.events.elapsed) {
         callback();
         if (this.enable == false) break;
      }
      this.callbackHandler = null;
      if (this.autoReset == true && this.enable == true) this.triggerTimer();
   }
   get Interval() { return this.interval; }
   set Interval(value) {
      if (typeof value !== 'number') throw new Error('The Interval property must be a number!');
      if (value <= 0 || value > Number.MAX_SAFE_INTEGER)
         throw new Error('The Interval property must be greater than 0 and not exceed Number.MAX_SAFE_INTEGER!');
      this.interval = value;
      this.clearCallback();
      this.triggerTimer();
   }
   get AutoReset() { return this.autoReset; }
   set AutoReset(value) {
      if (typeof value !== 'boolean') throw new Error('The AutoReset property must be a boolean!');
      this.autoReset = value;
   }
   init() {
      this.interval = 0;
      this.enable = false;
      this.autoReset = true;
      this.callbackHandler = null;
      this.events = {
         elapsed: new Set(),
      };
   }
   addEventListener(type, listener) {
      if (typeof type !== 'string') throw new Error('The tyoe parameter must be a string!');
      if (typeof listener !== 'function') throw new Error('The listener parameter must be a function!');
      this.events[type].add(listener);
   }
   removeEventListener(type, listener) {
      if (typeof type !== 'string') throw new Error('The tyoe parameter must be a string!');
      if (typeof listener !== 'function') throw new Error('The listener parameter must be a function!');
      this.events[type].delete(listener);
   }
   clear() {
      this.stop();
      this.init();
   }
   start() { this.Enabled = true; }
   stop() { this.Enabled = false; }

   constructor(interval) {
      this.init();
      if (typeof interval === 'number' && interval > 0)
         this.interval = interval;
   }
};