import data from './testdata.js';
import Meta from './models/meta-clusterer';

const userWorks = new Meta(data, {
    minObjectsEquality: 0.7,
    minWordsEquality: 0.5,
    considerThumbnails: false,
});

console.log(userWorks.data.length);
