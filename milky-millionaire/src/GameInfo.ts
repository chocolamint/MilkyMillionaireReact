const gameInfo = {
    cpus: [{
        name: "パクチー",
        color: "#F189C8",
        bgColor: "",
        imageFileName: "vegetable_pakuchi_coriander.png"
    }, {
        name: "日本酒",
        color: "#34BD67",
        bgColor: "",
        imageFileName: "masu_nihonsyu.png"
    }, {
        name: "餃子",
        color: "#26C4F0",
        bgColor: "",
        imageFileName: "food_gyouza_mise.png"
    }, {
        name: "かまぼこ",
        color: "#C97842",
        bgColor: "",
        imageFileName: "kamaboko_red.png"
    }],
    player: {
        rank: "平民",
    },
} as const;

export default gameInfo;