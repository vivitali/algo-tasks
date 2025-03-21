/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
    const starts = [...intervals].sort((a,b) => a[0] - b[0]);
    const ends = [...intervals].sort((a,b) => a[1] - b[1]);

    let rooms = 0;
    let endIdx = 0;

    for (let i = 0; i < starts.length; i++) {
        if (starts[i][0] < ends[endIdx][1]) {
            rooms++;
        } else {
            endIdx++;
        }
    }

    return rooms;
};