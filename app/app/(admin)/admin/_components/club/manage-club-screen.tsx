"use client"

import { DataTable } from "@/components/shared/datatable";

export const ManageClubScreen = () => {
  return (
    <div className="flex flex-col items-center min-h-screen flex-grow">
      <DataTable columns={[]} data={[]} options={{
        toolbar: undefined,
        navigation: undefined,
        selectable: undefined,
        toolbarOptions: undefined,
        navigationOptions: undefined
      }} name={""} />
    </div>
  );
};