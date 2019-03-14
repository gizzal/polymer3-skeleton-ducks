import {html, PolymerElement} from "@polymer/polymer/polymer-element.js";

import "@polymer/app-layout/app-drawer/app-drawer.js";
import "@polymer/app-layout/app-drawer-layout/app-drawer-layout.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import "@polymer/app-layout/app-header/app-header.js";
import "@polymer/app-layout/app-header-layout/app-header-layout.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/font-roboto-local/roboto.js";

import "@portavita/pv-corporate-logo/pv-corporate-logo.js";
import "@portavita/pv-profile-info/pv-profile-info.js";
import "@portavita/pv-styles/pv-app-colors.js";
import PvAppLocalizeBehavior from "@portavita/pv-app-localize-behavior/pv-app-localize-behavior.js";
import PvDeveloperLanguageSwitchBehavior from "@portavita/pv-app-localize-behavior/pv-developer-language-switch-behavior.js";

import {connect} from "pwa-helpers/connect-mixin.js";
import {store} from "../redux/store.js";
import {decreaseValue, increaseValue} from "../redux/ducks.js";

/**
 * This is a Polymer 3 template for new Portavita applications.
 * It provides localization, Redux and middleware.
 *
 * @customElementss
 * @PolymerElement
 */
class AppSkeleton extends connect(store)(PvDeveloperLanguageSwitchBehavior(PvAppLocalizeBehavior(PolymerElement))) {
  static get template() {
    return html`
      <style include="pv-app-colors">
        app-toolbar {
          height: 100%;
          background-color: var(--pv-primary-color);
          color: var(--pv-apptoolbar-text-color);
          --app-toolbar-font-size: 12px;
        }

        .unresizable-icon {
          min-width: 40px;
        }

        @media (max-width: 450px) {
          .desktop-view-only {
            display: none;
          }
        }

        :host {
          display: block;
          font-family: "Roboto", Helvetica, sans-serif;
        }

        .flex-center {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          margin: 20px;
        }

        paper-button.main {
          background-color: var(--pv-primary-color);
          color: white;
        }
      </style>
      <app-drawer-layout force-narrow="true">
        <app-drawer slot="drawer" swipe-open> </app-drawer>
        <app-header-layout>
          <app-header slot="header" effects="waterfall" fixed>
            <app-toolbar>
              <paper-icon-button class="unresizable-icon" icon="icons:menu"></paper-icon-button>
              <pv-corporate-logo class="desktop-view-only"></pv-corporate-logo>
              <div main-title><h1>pv-demo</h1></div>
              <pv-profile-info
                class="desktop-view-only"
                id="profileInfo"
                name="DEMO"
                title="DEMO"
                organization="DEMO"
                on-logout=" _handleLogoutUser"
                on-manage-account="_handleAccountUser"
                language="[[language]]"
                resources="[[resources]]"
              >
              </pv-profile-info>
            </app-toolbar>
          </app-header>
          <div class="flex-center">
            <paper-button class="main" on-click="_decreaseValue">[[gettext('decrease')]]</paper-button>
            <paper-item class="smth">[[count]]</paper-item>
            <paper-button class="main" on-click="_increaseValue">[[gettext('increase')]]</paper-button>
          </div>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      count: {
        type: Number
      },
      language: {
        value: "nl-NL"
      }
    };
  }

  ready() {
    super.ready();
    this.loadResources(this.resolveUrl("../../locales.json"));
  }

  _toggleDrawer() {
    this.shadowRoot.querySelector("app-drawer").toggle();
  }

  stateChanged(state) {
    this.count = state.app.count;
  }

  _decreaseValue() {
    store.dispatch(decreaseValue());
  }

  _increaseValue() {
    store.dispatch(increaseValue());
  }

  _handleLogoutUser() {
    console.log("_handleLogoutUser() was called");
  }

  _handleAccountUser() {
    console.log("__handleAccountUser was called");
    const hey = {1: 1, 2: 1, 4: 1, 5: 2};
  }
}

window.customElements.define("app-skeleton", AppSkeleton);
