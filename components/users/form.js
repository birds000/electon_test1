

//
formUser = function (data, action, id_) {
    if (action == 'delete') {
        Save(action, id_);
    } 
    else {
        /**
         * data : object data = {user_id:1, fname:'xxx', lname:'xxxx'}
         */
    let template = `
    <br>
    <form id='form-users'>
        <div class='panel panel-primary'>
            <div class='panel-heading'>Users</div>
            <div class='panel-body'>
                    
                    <div>
                        <label>FirstName</label>
                        <input value='${data.fname}' type="text" name='fname' class="form-control" id="fname" placeholder="Your Firstname...">
                    </div>
                    <div>
                        <label>LastName</label>
                        <input value='${data.lname}' type="text" name='lname' class="form-control" id="lname" placeholder="Your Lastname...">
                    </div>
                
            </div>
            <div class='panel-footer'>
                <div>
                    <button id='btnSaveUsers' class='btn btn-primary'>Save</button>
                </div>
            </div>
        </div>
    </form>    
    `;

    $('#show-users-form').html(template);

    }
    $('#btnSaveUsers').click(function () {
        Save(action, id_);
        return false;
    });
}
function Save(action, id_) {
    let knexMysql = require('../../database/KnexMysql.js');

    let frm = $('#form-users').serializeArray();
    let data = {};
    for (let i of frm) {
        data[i.name] = i.value;
    }
    if (action == 'create') {
        //create
        knexMysql.Create('member', data).then(res => {
            console.log(res);
            $('#form-users').hide();
            location.reload();
            ShowUser();
        });

    }
    else if (action == 'update') {
        knexMysql.Update('member', data, { id: id_ }).then(res => {
            console.log(res);
            $('#form-users').hide();
            location.reload();
            ShowUser();
        });
    }
    else if (action == 'delete') {
        knexMysql.Delete('member', { id: id_ }).then(res => {
            console.log(res);
            location.reload();
            ShowUser();
        });
    }

    return false;
}