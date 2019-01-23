import 'jquery';
import 'bootstrap';
import 'popper.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../vendor/Pagination.min.css';
import '../vendor/Pagination.min.js';
import '../scss/Pages/admin.scss';
import swal from 'sweetalert2/dist/sweetalert2.js'
import '../../node_modules/sweetalert2/dist/sweetalert2.min.css';


import *as $ from 'jquery';
import { KhoaHocServices } from '../../app/Services/KhoaHocService';
import { NguoiDungServices } from '../../app/Services/NguoiDungService';
import { NguoiDung } from '../../app/Models/NguoiDung';
import { DanhSachNguoiDung } from '../../app/Models/DanhSachNguoiDung';


let khoaHocService = new KhoaHocServices();
let nguoiDungService = new NguoiDungServices();
let danhSachNguoiDung = new DanhSachNguoiDung();

HienThiNguoiDungGhiDanh();
SelectKhoaHoc();
$('.inputMKH').click(function(){
    $('#tableHeadtr').html("");
    $('#tableBodytr').html("");
    $('#HocVien').html("");
});
function HienThiNguoiDungGhiDanh() {

    nguoiDungService.LayDanhSachNguoiDungService().done(function (data: any) {
        danhSachNguoiDung.MangNguoiDung = data;
        PhanTrang(data, '#tableBody');
    })
        .fail(function (error) {
            alert("Loi roi ");
        })
}
function PhanTrang(mangNguoiDung: any, idTable: string) {
    $('#pagination-container').pagination({
        dataSource: mangNguoiDung,
        pageSize: 8,
        showGoInput: true,
        showGoButton: true,
        callback: function (data, pagination) {
            let nguoiDungInfo = LoadDanhSachNguoiDungGhiDanh(data);
            $(idTable).html(nguoiDungInfo);
        }
    });
}
function LoadDanhSachNguoiDungGhiDanh(mangNguoiDung: any) {
    let nguoiDungInfo = "";
    mangNguoiDung.map(function (nguoidung: NguoiDung) {

        nguoiDungInfo += `
        <tr>
            <td>${nguoidung.TaiKhoan}</td>
            <td>${nguoidung.HoTen}</td>
            <td>${nguoidung.Email}</td>
            <td class="text-center" >
                <button class="btn btn-success btnGhiDanh " layTaiKhoan =${nguoidung.TaiKhoan}><i class="fa fa-check"></i></button>
            </td>
            <td class="text-center">    <button class="btn btn-info btnHienThi " taikhoan = ${nguoidung.TaiKhoan} tenhocvien=${nguoidung.HoTen}>Hiển Thị</button></td>

        </tr>
        `;
    })
    return nguoiDungInfo;
}





$('body').delegate('.btnHienThi',"click",function(){
    let tenHocVien = $(this).attr('tenhocvien');
    let hocVien = `
        Học Viên:${tenHocVien} <br>
       <p class="text-center" > khóa học đã ghi danh</p>
    `

    let tableHeader =`
    
        <th>Mã Khóa Học</th>
        <th>Tên Khóa Học</th>
        <th>Mô Tả</th>
        <th>Ngày Ghi Danh</th>
        <th>Hình Ảnh</th>
    `;
    $('#HocVien').html(hocVien);
    $('#tableHeadtr').html(tableHeader);
    let taikhoan:string = $(this).attr("taikhoan");
    let khoahocdk:string ="";
   khoaHocService.LayThongTinKhoaHoc(taikhoan)
	.done(
		res =>{
			if( typeof res !== 'string'){
              
				res.forEach((khoahoc)=>{
                    
                    khoahocdk+= `
                        <tr makhoahoc=${khoahoc.MaKhoaHoc}>
                         
                            <td>${khoahoc.MaKhoaHoc}</td>
                            <td>${khoahoc.TenKhoaHoc}</td>
                            <td>${khoahoc.MoTa}</td>
                            <td>${khoahoc.NgayGhiDanh}</td>
                            <td><img src='${khoahoc.HinhAnh}' width="50" height="50"></td>

                        </tr>
                    `;
                })
             
            }
           
             $('#tableBodytr').html(khoahocdk);
          
		
		})
    
     
})


function SelectKhoaHoc() {
    khoaHocService.LayDanhSachKhoaHocService().done(function (data) {
        LoadSelectKhoaHoc(data);
    })
        .fail(function (error) {
            console.log(error);
        })
}


function  LoadSelectKhoaHoc(mangKhoaHoc) {
    var noiDungSelect = "";
    mangKhoaHoc.map(function (khoahoc) {
        if (khoahoc) {
            noiDungSelect +=
                `
               <option value = "${khoahoc.MaKhoaHoc}">${khoahoc.TenKhoaHoc}</option>
            `;
        }
    });
    $(".inputMKH").html(noiDungSelect);
}

$('body').delegate('.btnGhiDanh',"click",function(){

    let makhoahoc:string = $('.inputMKH').val();
    console.log(makhoahoc);
    
    let taikhoan:string = $(this).attr("laytaikhoan");
    console.log(taikhoan);
   if((makhoahoc !== null) && (taikhoan!==null)){
        khoaHocService.GhiDanhKhoaHoc(makhoahoc,taikhoan).done(function(res){
            if(res){
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'You registered successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        }).fail(function(error){
            swal({
                position: 'center',
                type: 'warning',
                title: 'You have already registered for this course',
                showConfirmButton: false,
                timer: 1500
              })
        })
   }else{
         alert("nhap ten");
   }
})



$('.logout').click(function () {
    localStorage.clear();
    window.location.href = '/login.html';
});