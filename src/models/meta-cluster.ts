import { getMaxLength, compareWordLists } from '../utils/helpers';

const DEFAULT_WORDS_MIN = 0.5; // default min words equality percent
const DEFAULT_OBJECTS_MIN = 0.5; // default min objects equality percent

export interface WorkMeta {
    tags: string[];
    description: string;
    type: string;
    thumbnail: string;
    stockid: string;
    id: string;
}

interface MetaClusterOptions {
    minWordsEquality?: number;
    minObjectsEquality?: number;
    considerThumbnails?: boolean;
}

interface UnionMetaDataObj {
    description: string[];
    tags: string[];
}

export default class MetaCluster {
    private groupedData: WorkMeta[][] = [];
    minWordsEquality: number;
    minObjectsEquality: number;
    considerThumbnails: boolean;

    constructor(public initialData: WorkMeta[], options?: MetaClusterOptions) {
        this.minWordsEquality = this.validateNumberOption(
            options?.minWordsEquality
        )
            ? (options!.minWordsEquality as number)
            : DEFAULT_WORDS_MIN;

        this.minObjectsEquality = this.validateNumberOption(
            options?.minObjectsEquality
        )
            ? (options!.minObjectsEquality as number)
            : DEFAULT_OBJECTS_MIN;

        this.considerThumbnails = options?.considerThumbnails ?? false;

        this.considerThumbnails ? this.groupByThumbnail() : this.to2DList();
        this.mergeClusters();
    }

    public get data() {
        return this.groupedData;
    }

    /**
     * Validates option to correspond class requirements
     * @param option option of type 'number' to validate
     * @returns true if option pass the validation and false if not
     */
    private validateNumberOption = (option: number | undefined) => {
        return option && option >= 0 && option <= 1;
    };

    /**
     * Formats initial data to be procesed by class
     */
    private to2DList = () => {
        this.groupedData = this.initialData.map((metaObj) => [metaObj]);
    };

    /**
     * Groups initial data by thumbnails and formats it to be processed by class
     */
    private groupByThumbnail = () => {
        // TODO: Rewrite with hashmap

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

    /**
     * Creates union object from list of objects to make comparisons
     * @param data list of objects
     * @returns union object
     */
    private unionGroupMetaData = (data: WorkMeta[]) => {
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

    /**
     * Compares union objects on similarity by calculating objects' similarity percent
     * @param objA first union object to compare
     * @param objB second union object to compare
     * @returns true if objects are same and false if not
     */
    private compareUnionObjects = (
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

    /**
     * Creates groupedData field by merging similar lists of objects of initial data
     */
    private mergeClusters = () => {
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

                const unionMetaA = this.unionGroupMetaData(
                    this.groupedData[indexA]
                );
                const unionMetaB = this.unionGroupMetaData(
                    this.groupedData[indexB]
                );

                const equal = this.compareUnionObjects(unionMetaA, unionMetaB);

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
