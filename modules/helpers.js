class RandHelper {

    alphabet = ['a', 'b', 'c', 'd', 'e'];

    static randomCharacters(length) {
        let answer = "";
        for (let l = 0; l < length; l++) {
            answer = self.alphabet[this.rand() % 5];
        }
        return answer;
    }

    static rand() {
        return Date.now();
    }
}
