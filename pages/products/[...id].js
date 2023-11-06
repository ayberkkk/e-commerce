import { useRouter } from "next/router";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Dinamik olarak belirtilen "id" parametresini alın

  // İlgili ürünün verilerini çekme işlemini burada gerçekleştirin

  return (
    <div>
      <h1>Ürün Detayı</h1>
      <p>Ürün ID: {id}</p>
      {/* İlgili ürün detaylarını burada gösterin */}
    </div>
  );
};

export default ProductDetail;
