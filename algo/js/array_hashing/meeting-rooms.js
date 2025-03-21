/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
    if (intervals.length <= 1) return intervals.length
    intervals.sort((a, b) => a[0] - b[0])

    const endTimes = [intervals[0][1]];

    for (let i = 1; i < intervals.length ; i++) {
        const [start, end] = intervals[i];

        if (start >= endTimes[0]) {
            endTimes.shift()
        }

        let pos = 0;
        while(pos< endTimes.length && endTimes[pos]<end) {
            pos++
        }
        endTimes.splice(pos, 0, end)


    }

    return endTimes.length
};