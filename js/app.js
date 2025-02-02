// js/app.js
/*
  SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
  This file is part of Network Engineering Pro.
*/

// Polyfill for 'self' to ensure it is defined
(function (global) {
  if (typeof global.self === "undefined") {
    global.self = global;
  }
})(this);
