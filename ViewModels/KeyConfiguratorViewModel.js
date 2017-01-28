define(["require", "exports", "knockout", "Models/Room"], function (require, exports, ko, rm) {
    "use strict";
    var KeyConfiguratorViewModel = (function () {
        function KeyConfiguratorViewModel() {
            var _this = this;
            this.CreateMatrix = function () {
                _this.CheckMatrixLength(_this.NumberOfRooms());
                _this.Rooms.removeAll();
                for (var i = 0; i < _this.NumberOfRooms(); i++) {
                    var room = new rm.Room(_this.NumberOfRooms(), i);
                    _this.Rooms.push(ko.observable(room));
                }
            };
            this.CheckMatrixLength = function (indexlength) {
                if (indexlength > 676) {
                    alert("Mehr als 676 Schlüssel können nicht angelegt werden!");
                    _this.NumberOfRooms(676);
                }
            };
            this.CalculateKindOfKeys = function () {
                _this.ChoosenKeyCombination("");
                var seperator = "";
                for (var r = 0; r < _this.Rooms().length; r++) {
                    for (var k = 0; k < _this.Rooms()[r]().Keys().length; k++) {
                        if (_this.Rooms()[r]().Keys()[k]().Selected()) {
                            if (_this.ChoosenKeyCombination().length > 0) {
                                seperator = ",";
                            }
                            _this.ChoosenKeyCombination(_this.ChoosenKeyCombination().toString() + seperator + _this.getAlphaKeyPart(+k) + (r + 1).toString());
                        }
                    }
                }
                _this.MainKeys.removeAll();
                for (var i = 0; i < _this.NumberOfRooms(); i++) {
                    var room = _this.getAlphaKeyPart(i);
                    if (_this.keyanalyserservice.isMainKey(_this.ChoosenKeyCombination().split(","), room, _this.NumberOfRooms())) {
                        _this.MainKeys.push(room);
                    }
                }
            };
            this.getAlphaKeyPart = function (number) {
                var alphalength = _this.Alphabet.length;
                var result = "";
                if (number > alphalength - 1) {
                    var first = (number / (alphalength - 1) >> 0) - 1;
                    var rest = (number % (alphalength - 1)) - 1;
                    result = _this.Alphabet.substr(first, 1) + _this.Alphabet.substr(rest, 1);
                }
                else {
                    result = _this.Alphabet.substr(number, 1);
                }
                return result;
            };
            this.Rooms = ko.observableArray([]);
            this.Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            this.NumberOfRooms = ko.observable(0);
            this.ChoosenKeyCombination = ko.observable("");
            this.keyanalyserservice = new KeyAnalyserService();
            this.MainKeys = ko.observableArray([]);
            this.MatrixVisible = ko.computed(function () {
                return _this.NumberOfRooms() > 0;
            });
            this.MainKeysVisible = ko.computed(function () {
                return _this.MainKeys().length > 0;
            });
        }
        return KeyConfiguratorViewModel;
    }());
    ko.applyBindings(new KeyConfiguratorViewModel());
});
//# sourceMappingURL=KeyConfiguratorViewModel.js.map