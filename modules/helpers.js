export default class RandHelper {

    static alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    static randomCharacters(length) {
        let answer = "";
        for (let l = 0; l < length; l++) {
            answer += this.alphabet[(this.randomInt() + l) % this.alphabet.length-1];
        }
        return answer;
    }

    static randomInt() {
        return Math.floor(Date.now() / 1000);
    }
}