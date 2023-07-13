import { NgModule, Component, enableProdMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { DxSelectBoxModule, DxSchedulerModule } from "devextreme-angular";
import { Locale, Appointment, Service } from "./app.service";

import { locale, loadMessages, formatMessage } from "devextreme/localization";

import * as deMessages from "devextreme/localization/messages/de.json";
import * as ruMessages from "devextreme/localization/messages/ru.json";
import * as trMessages from "devextreme/localization/messages/tr.json";
@Component({
  selector: "demo-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [Service],
  preserveWhitespaces: true
})
export class AppComponent {
  locale: string;
  locales: Locale[];
  appointmentsData: Appointment[];
  currentDate: Date = new Date(2021, 9, 29);
  formatMessage = formatMessage;

  constructor(private service: Service) {
    this.locale = this.getLocale();
    this.appointmentsData = service.getAppointments();
    this.locales = service.getLocales();

    this.initMessages();
    locale(this.locale);
  }

  initMessages() {
    loadMessages(deMessages);
    loadMessages(ruMessages);
    loadMessages(trMessages);
  }

  changeLocale(data) {
    this.setLocale("tr");
    window.location.href = window.location.href;
  }

  getLocale() {
    var locale = sessionStorage.getItem("locale");
    return locale != null ? locale : "en";
  }

  setLocale(locale) {
    sessionStorage.setItem("locale", locale);
  }
}

@NgModule({
  imports: [BrowserModule, DxSelectBoxModule, DxSchedulerModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
