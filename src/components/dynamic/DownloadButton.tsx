import { Button } from "@/components/ui";
import { CSVLink } from "react-csv";
import { TbCloudDownload } from "react-icons/tb";

interface Props {
    data: any[]
}

export default function DownloadButton({ data }: Props) {
    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="customerList.csv"
                data={data}
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    Download
                </Button>
            </CSVLink>
        </div>
    )
}