GetSearchCredit() {
    return new Promise((resolve, reject) => {
        var input = {
            SearchCardParam: {
                CitizenshipNumber: this.$Prop.CitizenshipNumber.GetValue(),
                CustomerNumber: this.$Prop.CustomerNumber.GetValue(),
                HashCardNumber: null,
                MaskedCardNumber: null,
                SearchName: this.$Prop.NameSurname.GetValue(),
                ServiceDomainId: "01"
            }
        };

        this.$Page.ExecuteQuery("searchCardCredit", {
            Params: [input],
            Done: (records) => {
                if (records != null) {
                    records.SearchCardResult.forEach(x => x.CardType = "Credit");
                    this.creditCardList = records.SearchCardResult;
                }
                resolve();
            },
            Fail: () => resolve()
        });
    });
}

GetSearchDebit() {
    return new Promise((resolve, reject) => {
        var input = {
            SearchCardParam: {
                CitizenshipNumber: this.$Prop.CitizenshipNumber.GetValue(),
                CustomerNumber: this.$Prop.CustomerNumber.GetValue(),
                HashCardNumber: null,
                MaskedCardNumber: null,
                SearchName: this.$Prop.NameSurname.GetValue(),
                ServiceDomainId: "02"
            }
        };

        this.$Page.ExecuteQuery("searchCard", {
            Params: [input],
            Done: (records) => {
                if (records != null) {
                    records.SearchCardResult.forEach(x => x.CardType = "Debit");
                    this.debitCardList = records.SearchCardResult;
                }
                resolve();
            },
            Fail: () => resolve()
        });
    });
}


async LoadCards() {
    this.debitCardList = [];
    this.creditCardList = [];

    try {
        await Promise.all([this.GetSearchCredit(), this.GetSearchDebit()]);

        if (this.debitCardList.length > 0 || this.creditCardList.length > 0) {
            this.$View.RemoveAlert();
            this.$Page.ClearValidationState();

            const allCards = [...this.debitCardList, ...this.creditCardList];
            this.$Prop.CardList.SetValue(allCards);
        }
    } catch (error) {
        console.error("Kart yükleme sırasında hata oluştu", error);
    }
}   