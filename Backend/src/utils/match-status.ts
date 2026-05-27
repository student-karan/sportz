
type match_status = 'SCHEDULED' | 'LIVE' | 'FINISHED';

export function getMatchStatus(startTime: string, endTime: string, now = new Date()): match_status {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) {
        return 'SCHEDULED';
    }
    if (now >= end) {
        return 'FINISHED';
    }
    return 'LIVE';
}
