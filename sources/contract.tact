struct Data {
    minAmount: Int;
    maxAmount: Int;
}

contract SlotsContract {

    owner: Address;

    init(owner: Address) {
        self.owner = owner;
    }

    fun getSlotValue(number: Int): String {
        if (number < 10) {
            return "🍎";
        } 
        if (number >= 10 && number < 20) {
            return "🍌";
        }
        if (number >= 20 && number < 30) {
            return "🍉";
        }
        if (number >= 30 && number < 40) {
            return "🍎";
        } 
        if (number >= 40 && number < 50) {
            return "🍌";
        }
        if (number >= 50 && number < 60) {
            return "🍉";
        }
        if (number >= 60 && number < 70) {
            return "🍎";
        } 
        if (number >= 70 && number < 80) {
            return "🍌";
        }
        if (number >= 80 && number < 90) {
            return "🍉";
        }
        if (number >= 90) {
            return "🍎";
        } 
        return "🍉";
    }
    fun getSlotType(number: Int): Int {
        if (number < 10) {
            return 1;
        } 
        if (number >= 10 && number < 20) {
            return 2;
        }
        if (number >= 20 && number < 30) {
            return 3;
        }
        if (number >= 30 && number < 40) {
            return 1;
        } 
        if (number >= 40 && number < 50) {
            return 2;
        }
        if (number >= 50 && number < 60) {
            return 3;
        }
        if (number >= 60 && number < 70) {
            return 1;
        } 
        if (number >= 70 && number < 80) {
            return 2;
        }
        if (number >= 80 && number < 90) {
            return 3;
        }
        if (number >= 90) {
            return 1;
        } 
        return 3;
    }

    receive("withdraw") {
        require(self.owner == context().sender, "not owner");

        send(SendParameters{
            to: context().sender,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors, 
            bounce: false, 
            body: "Withdraw".asComment()
        });
    }

    receive() {
        let ctx: Context = context();
        let bet: Int = ctx.value;

        let balance: Int = myBalance();
        let maxBet: Int = balance / 2;
        let minBet: Int = ton("0.1");

        require(ctx.value < maxBet, "too large bet");
        require(ctx.value > minBet, "too small bet");

        let slot1: Int = random(1, 100);
        
        let slot2: Int = random(1, 100);

        let slot3: Int = random(1, 100);

        let slotValue: StringBuilder = beginString();
        slotValue.append(self.getSlotValue(slot1));
        slotValue.append(self.getSlotValue(slot2));
        slotValue.append(self.getSlotValue(slot3));
        
        let amount: Int = 0;
        let comment: String = "You win!";

        if (self.getSlotType(slot1) == self.getSlotType(slot2) == self.getSlotType(slot3)) {
            amount = bet * 2;
        }

        if (self.getSlotType(slot1) == self.getSlotType(slot2)) {
            amount = bet * 15 / 10;
        }
        if (self.getSlotType(slot2) == self.getSlotType(slot3)) {
            amount = bet * 15 / 10;
        }
        if (self.getSlotType(slot1) == self.getSlotType(slot3)) {
            amount = bet * 15 / 10;
        }

        if (amount == 0) {
            amount = bet / 10;
            comment = "You lost :(";
        }

        send(SendParameters{
            to: ctx.sender,
            value: amount,
            bounce: false, 
            body: slotValue.toString().asComment()
        });
        send(SendParameters{
            to: ctx.sender,
            value: ton("0.01"),
            bounce: false, 
            body: comment.asComment()
        });
    }

    get fun get_data(): Data {
        let balance: Int = myBalance();

        return Data{
            minAmount: ton("0.1"),
            maxAmount: balance / 2
        };
    }
}