var KeyAnalyserService = (function () {
    function KeyAnalyserService() {
        this.isMainKey = function (keycombinations, room, numberofrooms) {
            var ismainkey = true;
            for (var i = 0; i < numberofrooms; i++) {
                if (keycombinations.indexOf(room + (i + 1).toString()) === -1) {
                    ismainkey = false;
                    break;
                }
            }
            return ismainkey;
        };
    }
    return KeyAnalyserService;
}());
//# sourceMappingURL=KeyAnalyserService.js.map