define(["require", "exports", "knockout", "Models/Key"], function (require, exports, ko, km) {
    "use strict";
    var Room = (function () {
        function Room(numberofkeys, roomindex) {
            this.Keys = ko.observableArray([]);
            for (var i = 0; i < numberofkeys; i++) {
                var key = new km.Key();
                key.Selected = ko.observable(false);
                this.Keys.push(ko.observable(key));
            }
        }
        return Room;
    }());
    exports.Room = Room;
});
//# sourceMappingURL=Room.js.map