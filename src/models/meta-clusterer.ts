import { getMaxLength, compareWordLists } from '../utils/helpers';

interface WorkMeta {
    tags: string[];
    description: string;
    type: string;
    thumbnail: string;
    stockid: string;
    id: string;
}

interface MetaGroupOptions {
    minWordsEquality?: number;
    minObjectsEquality?: number;
    considerThumbnails?: boolean;
}

interface UnionMetaDataObj {
    description: string[];
    tags: string[];
}

export default class MetaClusterer {
    private groupedData: WorkMeta[][] = [];
    minWordsEquality: number;
    minObjectsEquality: number;
    considerThumbnails: boolean;

    constructor(public initialData: WorkMeta[], options?: MetaGroupOptions) {
        this.minWordsEquality = options?.minWordsEquality ?? 0.5;
        this.minObjectsEquality = options?.minObjectsEquality ?? 0.5;
        this.considerThumbnails = options?.considerThumbnails ?? false;

        this.considerThumbnails ? this._groupByThumbnail() : this._to2DList();

        this._mergeClusters();
    }

    public get data() {
        return this.groupedData;
    }

    private _to2DList = () => {
        this.groupedData = this.initialData.map((metaObj) => [metaObj]);
    };

    private _groupByThumbnail = () => {
        this.initialData.forEach((metaObj) => {
            const groupIndex = this.groupedData.findIndex(
                (metasArr) => metasArr[0].thumbnail === metaObj.thumbnail
            );

            if (groupIndex < 0) {
                this.groupedData.push([metaObj]);
            } else {
                this.groupedData[groupIndex].push(metaObj);
            }
        });
    };

    private _unionGroupMetaData = (data: WorkMeta[]) => {
        let newDescription: string[] = [];
        let newTags: string[] = [];

        data.forEach((metaObj) => {
            const descriptionWords = metaObj.description
                .toLowerCase()
                .replace('.', '')
                .replace(',', '')
                .split(' ');

            newDescription = [
                ...new Set([...newDescription, ...descriptionWords]),
            ];
            newTags = [...new Set([...newTags, ...metaObj.tags])];
        });

        const unionDataObj = {
            description: newDescription,
            tags: newTags,
        };

        return unionDataObj;
    };

    private _compareUnionObjects = (
        objA: UnionMetaDataObj,
        objB: UnionMetaDataObj
    ) => {
        const maxTagsNum = getMaxLength(objA.tags, objB.tags);
        const maxDescWordsNum = getMaxLength(
            objA.description,
            objB.description
        );

        const eqDescWordsNum = compareWordLists(
            objA.description,
            objB.description,
            this.minWordsEquality
        );
        const eqTagsNum = compareWordLists(
            objA.tags,
            objB.tags,
            this.minWordsEquality
        );

        const totalEqPercent =
            (eqDescWordsNum / maxDescWordsNum + eqTagsNum / maxTagsNum) / 2;

        return totalEqPercent >= this.minObjectsEquality;
    };

    private _mergeClusters = () => {
        let indexA = 0;

        while (indexA < this.groupedData.length - 1) {
            let indexB = indexA + 1;

            while (indexB < this.groupedData.length) {
                if (
                    this.groupedData[indexA][0].type !==
                    this.groupedData[indexB][0].type
                ) {
                    indexB += 1;
                    continue;
                }

                const unionMetaA = this._unionGroupMetaData(
                    this.groupedData[indexA]
                );
                const unionMetaB = this._unionGroupMetaData(
                    this.groupedData[indexB]
                );

                const equal = this._compareUnionObjects(unionMetaA, unionMetaB);

                if (equal) {
                    this.groupedData[indexA].push(...this.groupedData[indexB]);
                    // indexB += 1;
                    this.groupedData.splice(indexB, 1);
                    continue;
                }

                indexB += 1;
            }

            indexA += 1;
        }
    };
}
