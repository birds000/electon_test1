
function ShowUser() {

    let knexMysql = require('../../database/KnexMysql.js');
    knexMysql.showAll('member').then(res => {
        let headerTable = "";
        let bodyTable = "";
        headerTable += `
                <div class='row' style='margin-top:10px;'>
                    <div class='col-md-10 col-sm-10'><h3>Users</h3></div>
                    <div class='col-md-2' col-sm-2><button id='btnCreateUser' class='btn btn-success'><i class='glyphicon glyphicon-plus'></i> Create</button></div>
                </div>
                <div class='table-responsive'>
                    <table class='table table-responsive'>
                        <thead>
                            <tr>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id='tbody-user'></tbody>
                    </table>
                </div>
            `;

        for (let i of res) {
            bodyTable += `
                <tr>
                    <td>${i.fname}</td>
                    <td>${i.lname}</td>
                    <td width='150'>
                        <button data-id='${i.id}' fname='${i.fname}' lname='${i.lname}' class='btn btn-info btn-sm btnEdit'><i class='glyphicon glyphicon-pencil'></i> Edit</button>
                        <button data-id='${i.id}' fname='${i.fname}' lname='${i.lname}' class='btn btn-danger btn-sm btnDelete'><i class='glyphicon glyphicon-trash'></i> Delet</button>
                    </td>
                </tr>
            `;

        }
        $('#show-users').html(headerTable);
        $('#tbody-user').html(bodyTable);

        //btn update and delete
        $('.btnEdit').click(function () {
            let r = confirm("คุณต้องการแก้ไขข้อมูลนี้ใช้มั้ย??");
            if (r == true){
                let data = { fname: $(this).attr('fname'), lname: $(this).attr('lname') };
                formUser(data, 'update', $(this).attr('data-id'));
                $('#show-users').hide();
            }
        });

        $('.btnDelete').click(function () {
            let r = confirm("คุณต้องการลบลบข้อมูลนี้ใช้มั้ย??");
            if (r == true){
                let data = { fname: $(this).attr('fname'), lname: $(this).attr('lname') };
                formUser(data, 'delete', $(this).attr('data-id'));
                $('#show-users').hide();
            }
        });

        $('#btnCreateUser').on('click', () => {
            let r = confirm("คุณต้องการสร้างข้อมูลใช้มั้ย??");
            if (r == true){
                let data = { fname: '', lname: '' };
                formUser(data, 'create');
                $('#show-users').hide();
            }
        });

        require('./form');

        //btn update delete


    });//end call back  

}
ShowUser();

