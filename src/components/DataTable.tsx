import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatRupiah } from "@/lib/utils";
import { Button } from "./ui/button";
import { api } from "@/lib/axios";

export const DataTable = ({ data, setForm, setIsEditing }: any) => {
    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/rents/${id}`);
            window.location.reload()
        } catch (error) {
            alert("Gagal menghapus data");
        }
    };

    const handleEdit = async (e: any) => {
        const { data } = await api.get(`/rents/${e.id}`)
        const payload = {
            name: data.renter_name,
            selectedCar: data.car_id,
            selectedProgram: data.program_id,
            duration: data.duration,
            extraHours: data.extra_hours ?? 0,
            id: data.id
        }
        setForm(payload)
        setIsEditing(true)
    }

    if (!data) return <h1>Tidak ada data</h1>;
    return (
        <Table>
            <TableCaption>Data Rental Mobil</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-center">No.</TableHead>
                    <TableHead className="text-center">Nama Penyewa</TableHead>
                    <TableHead className="text-center">Nama Mobil</TableHead>
                    <TableHead className="text-center">Program</TableHead>
                    <TableHead className="text-center">Biaya</TableHead>
                    <TableHead className="text-center w-[80px] text-wrap">
                        Lama Sewa (Hari)
                    </TableHead>
                    <TableHead className="text-center">Paket 1 (10%)</TableHead>
                    <TableHead className="text-center">Paket 2 (20%)</TableHead>
                    <TableHead className="text-center">Paket 3 (25%)</TableHead>
                    <TableHead className="text-center">Extra Hours</TableHead>
                    <TableHead className="text-center">Total Biaya</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((e: any, i: number) => (
                    <TableRow key={e.id}>
                        <TableCell className="w-[100px] text-center">{i + 1}</TableCell>
                        <TableCell className="text-center">{e.renter}</TableCell>
                        <TableCell className="text-center">{e.car_name}</TableCell>
                        <TableCell className="text-center">{e.program ?? "-"}</TableCell>
                        <TableCell className="text-center">
                            {formatRupiah(e.car_cost)}
                        </TableCell>
                        <TableCell className="text-center">{e.rent_duration}</TableCell>
                        <TableCell className="text-center">4</TableCell>
                        <TableCell className="text-center">7</TableCell>
                        <TableCell className="text-center">10</TableCell>
                        <TableCell className="text-center">{e.extra_hours}</TableCell>

                        <TableCell className="text-center">
                            {formatRupiah(e.total_price)}
                        </TableCell>
                        <TableCell className="text-center flex gap-2">
                            <Button onClick={() => handleEdit(e)} variant={"outline"}>edit</Button>
                            <Button onClick={() => handleDelete(e.id)} variant={"destructive"}>
                                Hapus
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
