import { connect } from "react-redux";
import { useKeycloak } from '@react-keycloak/web'
import CertInspectorSideBar from "./CertInspectorSideBar"
import { getCertById } from "ducks/certs/Reducer";

const mapStateToProps = (state, {certId}) => ({ 
  certData : getCertById(state, certId)
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps) (CertInspectorSideBar);