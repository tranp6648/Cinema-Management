import { useLocation, useNavigate } from "react-router-dom";
import FooterHome from "../components/footer/FooterHome";
import Menu from "../components/Menu/Menu";
import './Tranfer.css';
import { TransferOrder } from "../components/Services/OrderService";
import Swal from "sweetalert2";

function Tranfer() {
    const location = useLocation();
    const navigate = useNavigate();
    const OrderCode = location.state?.OrderCode || "";

    const copyBankName = () => {
        navigator.clipboard.writeText("Ngân hàng VietCombank").then(() => {
            alert("Tên ngân hàng đã được sao chép!");
        }).catch(err => {
            console.error("Lỗi khi sao chép tên ngân hàng: ", err);
        });
    };
    const handleSubmitTransfer=async(e)=>{
        e.preventDefault();
      
        try{
            const response= await TransferOrder(OrderCode);
            console.log(response)
            if(response==true){
                Swal.fire({
                    icon: 'success',
                    title: 'Confirm Transfer Success',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/ThanhYou')
            }
        }catch(err){
            console.log(err)
        }
    }

    const copyAccountNumber = () => {
        navigator.clipboard.writeText("10109244977").then(() => {
            alert("Số tài khoản đã được sao chép!");
        }).catch(err => {
            console.error("Lỗi khi sao chép số tài khoản: ", err);
        });
    };

    const copyTransferContent = () => {
        const transferText = `Chuyển tiền đơn hàng ${OrderCode}`;
        navigator.clipboard.writeText(transferText).then(() => {
            alert("Nội dung chuyển khoản đã được sao chép!");
        }).catch(err => {
            console.error("Lỗi khi sao chép nội dung chuyển khoản: ", err);
        });
    };

    return (
        <>
            <div>
                <Menu />
                <div style={{ height: '296px', marginTop: '5px' }}>
                    <div className="breadcrumb-area">
                        <div className="container">
                            <div className="breadcrumb-content">
                                <h2 className="font-bold" style={{ color: '#ffffff', textTransform: 'uppercase', textAlign: 'center', fontSize: '36px', marginBottom: '0', paddingBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Blog</h2>
                                <ul>
                                    <li>
                                        <a href="/" style={{ textDecoration: 'none' }}>Home</a>
                                    </li>
                                    <li className="active">Blog</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="elementor elementor-72" style={{ paddingTop: '160px', fontWeight: '600' }}>
                    <section className="elementor-section elementor-top-section elementor-element elementor-element-9845cb1 elementor-section-boxed elementor-section-height-default elementor-section-height-default mb-[31px]">
                        <div className="elementor-container elementor-column-gap-default">
                            <div className="w-[100%]">
                                <ul className="mb-button-filter-ajax mb-date-tabs">
                                    <div className="transfer-container">
                                        <h2>Thông tin chuyển khoản</h2>
                                        <form onSubmit={handleSubmitTransfer}>
    <div className="form-group">
        <label htmlFor="bankName">Tên ngân hàng:</label>
        <p>Ngân hàng VietCombank</p>
        <button type="button" className="copy-btn" onClick={copyBankName}>
            <i className="fas fa-copy"></i> Copy
        </button>
    </div>
    <div className="form-group">
        <label htmlFor="accountNumber">Số tài khoản:</label>
        <p>10109244977</p>
        <button type="button" className="copy-btn" onClick={copyAccountNumber}>
            <i className="fas fa-copy"></i> Copy
        </button>
    </div>
    <div className="form-group">
        <label htmlFor="transferContent">Nội dung chuyển khoản:</label>
        <p>Chuyển tiền đơn hàng {OrderCode}</p>
        <button type="button" className="copy-btn" onClick={copyTransferContent}>
            <i className="fas fa-copy"></i> Copy
        </button>
    </div>
    <button type="submit" className="confirm-btn" >Xác nhận chuyển khoản</button>
</form>

                                    </div>
                                </ul>
                                <div className="elementor-widget-wrap elementor-element-populated">
                                    <div>
                                        <div className="elementor-widget-container">
                                            <div className="mb-movie-list mb-movie-list-template1 four_column"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <FooterHome />
            </div>
        </>
    );
}

export default Tranfer;
