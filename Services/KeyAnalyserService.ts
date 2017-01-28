class KeyAnalyserService implements IKeyAnalyserService
{
    public isMainKey = (keycombinations: string[], room: string, numberofrooms: number): boolean => {
        var ismainkey: boolean = true;
        for (var i: number = 0; i < numberofrooms; i++) {
            if (keycombinations.indexOf(room + (i + 1).toString()) === -1) {
                ismainkey = false;
                break;
            }
        }
        return ismainkey;
    }
}