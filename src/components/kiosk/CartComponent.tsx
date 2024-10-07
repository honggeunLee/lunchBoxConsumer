import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/rtk.ts";

function CartComponent() {
    const navigate = useNavigate();
    const cartItems = useAppSelector((state) => state.cart.products);

    const handleReserve = () => {
        navigate('/kiosk/payment'); // 결제 페이지로 이동
    };

    return (
        <div className="flex flex-col space-y-6 w-full max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center text-blue-500 mb-4">장바구니</h2>

            {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center">장바구니가 비어 있습니다.</p>
            ) : (
                <div>
                    <ul className="divide-y divide-gray-300">
                        {cartItems.map((item) => (
                            <li key={item.pno} className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-700">상품명: {item.pname}</p>
                                    <p className="text-gray-600">수량: {item.quantity}</p>
                                    <p className="text-gray-600">총 가격: {item.totalPrice}원</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleReserve}
                        className="w-full bg-blue-500 text-white py-2 px-4 mt-6 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        예약하기
                    </button>
                </div>
            )}
        </div>
    );
}

export default CartComponent;
