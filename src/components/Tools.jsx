export const TimeFormat = (isoTimeStr) => {
    
    const date = new Date(isoTimeStr);

    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const readableTimeStr = `${formattedTime}, ${formattedDate}`;
    return readableTimeStr


}

