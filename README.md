# Promise Nedir?

Promise, JavaScript’te asenkron işlemleri yönetmek için kullanılan bir nesnedir. Bir işlemin gelecekte tamamlanıp tamamlanmayacağını veya hata verip vermeyeceğini temsil eder.

## Promise Üç Durumda Olabilir:

- **Pending (Beklemede)** → İşlem devam ediyor.
- **Fulfilled (Başarılı)** → İşlem başarılı şekilde tamamlandı.
- **Rejected (Başarısız)** → İşlem hata verdi.

## Örnek Kullanım:

```javascript
return new Promise((resolve, reject) => {
    this.$Page.ExecuteQuery()
        .Done(() => {
            resolve(); // API çağrısı başarılı olduğunda Promise tamamlanır.
        })
        .Fail(() => {
            resolve(); // Hata durumunda bile Promise tamamlanır (kod akışı durmaz).
        });
});
```

`await Promise.all([...])` Kullanımı

`await Promise.all([...])` kullanılarak iki API çağrısı aynı anda başlatılıyor ve ikisi de tamamlanana kadar bekleniyor. Eğer `Promise` yerine callback fonksiyonlar kullanılsaydı, bu işlemleri yönetmek daha karmaşık hale gelirdi.

- `return new Promise((resolve, reject) => {...})` → Yeni bir Promise oluşturuluyor.  
- `this.$Page.ExecuteQuery()` → Asenkron bir işlem (API çağrısı) yapılıyor.  
- **Done** fonksiyonunda API çağrısı başarılı olursa `resolve()` çağrılarak Promise tamamlanıyor.  
- **Fail** durumunda bile `resolve()` çağrılıyor ki hata alsa bile işlem tamamlanmış olarak sayılabilsin (böylece kod akışı durmaz).  

## Özet

- **Promise**, asenkron işlemleri daha düzenli bir şekilde yönetmek için kullanılır.
- `GetSearchCredit()` ve `GetSearchDebit()` fonksiyonları API çağrıları yaptığı için `Promise` kullanılarak işlem tamamlanınca sonraki adıma geçiliyor.
- `LoadCards()` içinde `await Promise.all([...])` ile her iki işlem aynı anda çalıştırılıp bekleniyor, böylece performans artırılıyor.
- `Promise` kullanımı sayesinde daha okunabilir ve hataya dayanıklı bir kod yazılmış oluyor.
