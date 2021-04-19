const hash = (key, size) => {
    let hashedKey = 0;
    for (let i = 0; i < key.length; i++) {
        hashedKey = key.charCodeAt(i);
    }
    return hashedKey % size
}

class hashtable {
    constructor(size) {
        this.size = size;
        this.buckets = Array(this.size)

        for (let i = 0; i < this.buckets.length; i++) {
            this.buckets[i] = new Map();
        }
    }

    insert(key, value) {
        let idx = hash(key, this.size)

        return this.buckets[idx].set(key, value)
    }

    remove(key) {
        let idx = hash(key, this.size)
        let deleted = this.buckets[idx].get(key)
        this.buckets[idx].delete(key)

        return deleted;
    }

    search(key) {
        let idx = hash(key, this.size)

        return this.buckets[idx].get(key)
    }

}

var images = new hashtable(20)

images.insert("default", "/images/default.webp");
images.insert("cloudy", "/images/default.webp");
images.insert("overcast", "/images/overcast.webp");
images.insert("clear", "/images/clear.webp");
images.insert("sunny", "/images/sunny.webp");
images.insert("partly cloudy", "/images/partlycloudy.webp");
images.insert("mist", "/images/mist.webp");
images.insert("fog", "/images/fog.webp");
images.insert("light rain, mist", "/images/rainmist.webp");
images.insert("light rain", "/images/lightrain.webp");
images.insert("rain", "/images/rain.webp");
images.insert("heavy rain", "/images/rain.webp");
images.insert("thunderstorm", "/images/thunderstorm.webp");
images.insert("hail", "/images/hail.webp");
images.insert("sleet", "/images/sleet.webp");
images.insert("snow", "/images/snow.webp");
images.insert("heavy snow", "/images/heavysnow.webp");

export default images;