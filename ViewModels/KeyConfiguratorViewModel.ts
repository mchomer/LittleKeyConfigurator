import * as ko from "knockout";
import rm = require("Models/Room");
import km = require("Models/Key");

class KeyConfiguratorViewModel
{
    public Rooms: KnockoutObservableArray<KnockoutObservable<rm.Room>>;
    private Alphabet: string;
    public NumberOfRooms: KnockoutObservable<number>;
    public ChoosenKeyCombination: KnockoutObservable<string>;
    private keyanalyserservice: KeyAnalyserService;
    public MainKeys: KnockoutObservableArray<string>;
    public MatrixVisible: KnockoutComputed<boolean>;
    public MainKeysVisible: KnockoutComputed<boolean>;

    constructor() 
    {
        this.Rooms = ko.observableArray<KnockoutObservable<rm.Room>>([]);
        this.Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.NumberOfRooms = ko.observable<number>(0);
        this.ChoosenKeyCombination = ko.observable<string>("");
        this.keyanalyserservice = new KeyAnalyserService();
        this.MainKeys = ko.observableArray<string>([]);
        this.MatrixVisible = ko.computed<boolean>(() => {
            return this.NumberOfRooms() > 0;
        });
        this.MainKeysVisible = ko.computed<boolean>(() => {
            return this.MainKeys().length > 0;
        });
    }
    
    public CreateMatrix = (): void => 
    {
        this.CheckMatrixLength(this.NumberOfRooms());
        this.Rooms.removeAll();
        for (var i = 0; i < this.NumberOfRooms(); i++) {
            var room = new rm.Room(this.NumberOfRooms(), i);
            this.Rooms.push(ko.observable(room));
        }
    }

    private CheckMatrixLength = (indexlength: number): void => {
        if (indexlength > 676) {
            alert("Mehr als 676 Schlüssel können nicht angelegt werden!");
            this.NumberOfRooms(676);
        }
    }

    public CalculateKindOfKeys = (): void => 
    {
        this.ChoosenKeyCombination("");
        var seperator: string = "";
        for (var r: number = 0; r < this.Rooms().length; r++) {
            for (var k: number = 0; k < this.Rooms()[r]().Keys().length; k++) {
                if (this.Rooms()[r]().Keys()[k]().Selected()) {
                    if (this.ChoosenKeyCombination().length > 0)
                    {
                        seperator = ",";
                    }
                    this.ChoosenKeyCombination(this.ChoosenKeyCombination().toString() + seperator + this.getAlphaKeyPart(+k) + (r + 1).toString());
                }
            }
        }
        this.MainKeys.removeAll();
        for (var i: number = 0; i < this.NumberOfRooms(); i++) {
            var room: string = this.getAlphaKeyPart(i);
            if (this.keyanalyserservice.isMainKey(this.ChoosenKeyCombination().split(","), room, this.NumberOfRooms())) {
                this.MainKeys.push(room);
            }
        }
    }

    private getAlphaKeyPart = (number: number): string =>
    {
        var alphalength = this.Alphabet.length;
        var result: string = "";
        if (number > alphalength - 1) {
            var first: number = (number / (alphalength - 1) >> 0) - 1;
            var rest: number = (number % (alphalength - 1)) - 1;
            result = this.Alphabet.substr(first,1) + this.Alphabet.substr(rest, 1); 
        } else {
            result = this.Alphabet.substr(number,1);
        }
        return result;
    }
}

ko.applyBindings(new KeyConfiguratorViewModel());