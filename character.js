// subfunction: attr
var attr = function attr(value) {
    var isMember = typeof value !== "function";

    return {
        value: value,
        writable: isMember,
        enumerable: isMember,
        configurable: false
    }
};


// Character.create
var create = function create() {
    var Character = function Character() {};
    var instance = new Character();

    Object.defineProperties(instance, {
        no:      attr(0),
        name:    attr(null),
        type:    attr(null),
        classes: attr([]),
        star:    attr(0),
        cost:    attr(0),
        combo:   attr(0),
        min:     attr({ LV: 0, HP: 0, ATK: 0, RCV: 0 }),
        max:     attr({ LV: 0, HP: 0, ATK: 0, RCV: 0 }),

        setNo: attr(function setNo(no) {
            instance.no = no;
            return instance;
        }),

        setName: attr(function setNo(name) {
            instance.name = name;
            return instance;
        }),

        setType: attr(function setType(type) {
            instance.type = type;
            return instance;
        }),

        addClass: attr(function addClass(classes) {
            instance.classes.push(classes);
            return instance;
        }),

        setStar: attr(function setStar(star) {
            instance.star = star;
            return instance;
        }),

        setCost: attr(function setCost(cost) {
            instance.cost = cost;
            return instance;
        }),

        setCombo: attr(function setCombo(combo) {
            instance.combo = combo;
            return instance;
        }),

        setMin: attr(function setMin(obj) {
            instance.min = {
                LV:  obj.LV,
                HP:  obj.HP,
                ATK: obj.ATK,
                RCV: obj.RCV
            };
            return instance;
        }),

        setMax: attr(function setMax(obj) {
            instance.max = {
                LV:  obj.LV,
                HP:  obj.HP,
                ATK: obj.ATK,
                RCV: obj.RCV
            };
            return instance;
        })
    });

    return instance;
};

// export
module.exports = {
    create: create
};
