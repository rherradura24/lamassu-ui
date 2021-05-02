import { CertCard } from "components/CertCard";

const CAList = ({casData}) => {
    console.log(casData);

    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
        {
            casData.map(caData => <CertCard title={caData.name} status={caData.status} certData={caData.subject_dn} key={caData.serial_number} styles={{margin: 10}}/> )
        }
        </div>
    )
}

export default CAList