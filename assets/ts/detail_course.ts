import 'jquery';
import*as $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/jquery/dist/jquery.min.js';
import '../scss/Pages/detail.scss';
import '../scss/Pages/header.scss';
import '../scss/Pages/footer.scss';
import '../vendor/sticky.js';
import { KhoaHocServices } from '../../app/Services/KhoaHocService';


let contentTitle:string ="";
let image:string ="";
let makhoahoc = localStorage.getItem("MaKhoaHoc");
console.log(makhoahoc);
let khoaHocService = new KhoaHocServices();
khoaHocService.LayChiTietKhoaHoc(makhoahoc)
.done(function(khoahoc){
    contentTitle = `<h2 >${khoahoc.TenKhoaHoc}</h2>
                    `
    image =` 
    <img src="${khoahoc.HinhAnh}" style=" width:100%; height:450px">
    <div class="row pt-3">
        <div class="col-md-12 p-3" style="background-color: white; border-radius: 15px">
            <h3>This is a description of the ${khoahoc.TenKhoaHoc} course</h3>
            <p>${khoahoc.MoTa}</p>
            <p>Creater:${khoahoc.NguoiTao}</p>

        </div>

    </div>`
    ;
    $('#title').html(contentTitle);
    $('#desctiption').html( image);
   
})
		

