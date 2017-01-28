import * as ko from "knockout";
import km = require("Models/Key");

export class Room
{
    public Keys: KnockoutObservableArray<KnockoutObservable<km.Key>>;

    constructor(numberofkeys: number, roomindex: number)
    {
        this.Keys = ko.observableArray<KnockoutObservable<km.Key>>([]);
        for (var i = 0; i < numberofkeys; i++) {
            var key = new km.Key();
            key.Selected = ko.observable<boolean>(false);
            this.Keys.push(ko.observable<km.Key>(key));            
        }
    }
}