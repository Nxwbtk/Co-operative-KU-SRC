export const CheckWordSortTop = ({ title }: { title: string }) => {
    if (title === "ลำดับที่") {
        return "เรียงจากน้อยไปมาก";
    }
    if (title === "ชื่อ") {
        return "เรียงตามลำดับตัวอักษร ก - ฮ";
    }
    if (title === "คณะ") {
        return "เรียงตามลำดับตัวอักษร ก - ฮ";
    }
    if (title === "สาขา") {
        return "เรียงตามลำดับตัวอักษร ก - ฮ";
    }
    if (title === "ปีการศึกษา") {
        return "เรียงจากน้อยไปมาก";
    }
    if (title === "รางวัล") {
        return "เรียงตามลำดับตัวอักษร ก - ฮ";
    }
    return "เรียงจากน้อยไปมาก";
};

export const CheckWordSortBottom = ({ title }: { title: string }) => {
    if (title === "ลำดับที่") {
        return "เรียงจากมากไปน้อย";
    }
    if (title === "ชื่อ") {
        return "เรียงตามลำดับตัวอักษร ฮ - ก";
    }
    if (title === "คณะ") {
        return "เรียงตามลำดับตัวอักษร ฮ - ก";
    }
    if (title === "สาขา") {
        return "เรียงตามลำดับตัวอักษร ฮ - ก";
    }
    if (title === "ปีการศึกษา") {
        return "เรียงจากมากไปน้อย";
    }
    if (title === "รางวัล") {
        return "เรียงตามลำดับตัวอักษร ฮ - ก";
    }
    return "เรียงจากมากไปน้อย";
}