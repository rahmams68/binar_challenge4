// GET CARS
const getAllCar = () => {
    fetch('/getcars')
        .then((response) => response.json())
        .then((hasil) => {
            for (let a = 0; a < hasil.length; a++) {
                const cards = document.getElementById('cars')
                const card = document.createElement('div')
                card.innerHTML = `<img src="${hasil[a].image}" alt="car-image">

                <div class="car-info">
                    <p>${hasil[a].manufacture} - ${hasil[a].model}</p>
                    <h4>Rp ${hasil[a].rentPerDay} / hari</h4>
                    <p>${hasil[a].description}</p>

                    <div class="icon">
                        <img src="images/fi_users.png" />
                        <p>${hasil[a].capacity} orang</p>
                    </div>

                    <div class="icon">
                        <img src="images/fi_settings.png" />
                        <p>${hasil[a].transmission}</p>
                    </div>

                    <div class="icon">
                        <img src="images/fi_calendar.png" />
                        <p>Tahun ${hasil[a].year}</p>
                    </div>
                </div>

                <button>Pilih Mobil</button>`

                card.classList.add("car")
                cards.appendChild(card)
            }
        })
}

getAllCar()


// FILTER CARS
const filterCar = (driver, tgl, jam, jml) => {
    fetch('/getcars')
        .then((response) => response.json())
        .then((hasil) => {
            for (let a = 0; a < hasil.length; a++) {
                if (
                    hasil[a].available.toString() == driver &&
                    hasil[a].availableAt.slice(0,10) <= tgl &&
                    hasil[a].availableAt.slice(11,16) <= jam &&
                    hasil[a].capacity == jml
                ) {
                    console.log(hasil[a].available, hasil[a].availableAt.slice(0,10), hasil[a].availableAt.slice(11,16), hasil[a].capacity)
                console.log(hasil[a].available.toString() == driver, hasil[a].availableAt.slice(0,10) >= tgl, hasil[a].availableAt.slice(11,16) >= jam, hasil[a].capacity == jml)
                    const cards = document.getElementById('cars')
                    const card = document.createElement('div')
                    card.innerHTML = `<img src="${hasil[a].image}" alt="car-image">

                    <div class="car-info">
                        <p>${hasil[a].manufacture} - ${hasil[a].model}</p>
                        <h4>Rp ${hasil[a].rentPerDay} / hari</h4>
                        <p>${hasil[a].description}</p>

                        <div class="icon">
                            <img src="images/fi_users.png" />
                            <p>${hasil[a].capacity} orang</p>
                        </div>

                        <div class="icon">
                            <img src="images/fi_settings.png" />
                            <p>${hasil[a].transmission}</p>
                        </div>

                        <div class="icon">
                            <img src="images/fi_calendar.png" />
                            <p>Tahun ${hasil[a].year}</p>
                        </div>
                    </div>

                    <button>Pilih Mobil</button>`

                    card.classList.add("car")
                    cards.appendChild(card)
                }
            }
        })
}

const btnCari = document.getElementById('cari-mobil')

btnCari.addEventListener('click', (e) => {
    e.preventDefault()
    let driver = document.forms['form']['tipe'].value
    let tgl = document.forms['form']['tgl'].value
    let jam = document.forms['form']['jam'].value
    let jml = document.forms['form']['jml'].value

    if (tgl == "")
    { tgl = new Date().toISOString().split('T')[0] }

    if (jml == "")
    { jml = 0 }

    console.log(typeof driver, typeof tgl, typeof jam, typeof jml)
    console.log(driver, tgl, jam, jml)

    document.getElementById('cars').innerHTML = ""
    filterCar(driver, tgl, jam, jml)
})