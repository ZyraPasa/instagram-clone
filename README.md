# Sosyal Medya Platformu Klonu, Instagram veya Insta Klon

Instagram adı altında bulunan sosyal medya platformunun hizmetini HTML ve CSS olarak bir nevi benzerini yazdım. Bunu gerçekleştirirken Svelte ile Sapper kullandım. Arkaplanda veri akışını destekleyecek kısımda NodeJS tercih ettim.

Client tarafında olan özelliklerden bahsetmem gerekirse:
Düzenli Components kullanımı bulunmakta.
Dinamik olarak tüm platformlara yönelik, telefon, bilgisayar, tablet, Responsive bir tasarım düzenlendi.
Svelte aracılığı ile sayfalar arası yenileme, yeni sayfa akışı veya ekstra sorgu iptali sağlandı. 
Anlaşılabilir ve örgüsü fazla olmayan, saf bir kodlama ile yazıldı. İncelediğiniz takdirde fark edebilirsiniz.
Saf Javascript kullanımına özen gösterildi.
Svelte ile Sapper'ın da sunduğu mobil uygulama hazırlandı.
Input ve Output kontrolleri, işlemleri yapıldı.

Server tarafında olan özelliklere değinmem gerekirse:
Kütüphane kullanımında düzene dikkat edildi.
Dinamik Class(OOP) kullanıldı.
Middleware kullanımı stabil, düzene uygun olarak hazırlandı.
Dinamik API servisi aktif edildi.
Dosya, fotoğraf ve benzeri yükleme olaylarında kontroller sağlandı.
Sınırlamalar, hız limit ayarları hazırlandı.

Hikaye hariç geri kalan tüm özellikler Instagram hizmetleri ile birebir çalışmaktadır. Kurulum için sizlere sunduğum SQL prosedürdür. Client ve Server klasörlerini kullanmanız yeterli olacaktır. Modüler sistem otomatik olarak kurulacak, sorunsuz şekilde çalışacaktır.
