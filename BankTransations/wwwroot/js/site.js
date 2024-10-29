// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


//$(function () {
//    $("#loaderbody").addClass('hide');

//    $(document).bind('ajaxStart', function () {
//        $("#loaderbody").removeclass('hide');
//    }).bind('ajaxStop', function () {
//        $("#loaderbody").addClass('hide');
//    });
//});


//Show in Popup
//var showInPopup = (url, title) => {
//    $.ajax({
//        type: "GET",
//        url: url,
//        success: function (res) {
//            $("#form-modal .modal-body").html(res);
//            $("#form-modal .modal-title").html(title);
//            $("#form-modal").modal('show');
//        }
//    });
//}


//Add Or edit Transaction
var addOrEdit = (Id) => {

    $.ajax({
        type: "GET",
        url: "/Transactions/AddOrEdit",
        data: {
            id: Id
        },
        success: function (res) {
            $("#form-modal .modal-body").html(res);
            $("#form-modal .modal-title").html('Update Transaction');
            $("#form-modal").modal('show');
        }
    });
}

//Save Transaction
function SaveTransaction() {
    debugger
    var obj = {
        transactionId: $('#TransactionId').val(),
        accountNumber: $('#AccountNumber').val(),
        bankName: $('#BankName').val(),
        beneficiaryName: $('#BeneficiaryName').val(),
        sWIFTCode: $('#SWIFTCode').val(),
        amount: $('#Amount').val(),
        date: $('#Date').val()
    };

    if (obj.beneficiaryName == "" || obj.accountNumber == "" || obj.bankName == "" || obj.sWIFTCode == "") {
        $.ajax({
            success: function (res) {
                $("#view-all").html(res.html);
                $.notify('Please enter the required fields!', { globalPosition: 'top center', className: 'error' });

            },
        });
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/Transactions/AddOrEdit",
        data: {
            transaction: obj
        },
        success: function (res) {
            $("#view-all").html(res);
            $("#form-modal .modal-body").html('');
            $("#form-modal .modal-title").html('');
            $("#form-modal").modal('hide');
            $.notify('Submitted successfully', { globalPosition: 'top center', className: 'success' });

        },
        error: function (err) {
            console.log(err);
        }
    });
}


//Withdraw amount
function withDraw() {
    debugger
    var amount = $("#txtAmount").val()
    var transactionId = $('#hiddenTransactionId').val();

    $.ajax({
        type: "POST",
        url: "/Transactions/SaveWithdraw",
        data: {
            Amount: amount,
            TransactionId: transactionId
        },
        success: function (res) {
            if (res == true) {
                var remainingAmount = $('#reamaining-amount').text();

                var newAmount = parseFloat(remainingAmount) - parseFloat(amount)
                $('#reamaining-amount').text(newAmount);

                $("#txtAmount").val('')
                var transactionId = $('#hiddenTransactionId').val();
                $.ajax({
                    type: "GET",
                    url: "/Transactions/GetWithdrawsByTransationId",
                    data: {
                        TransactionId: transactionId
                    },
                    success: function (response) {
                        debugger
                        var _html = "";
                        for (var i = 0; i < response.length; i++) {
                            _html += '<tr>';
                            _html += '<td>' + response[i].transactionId + '</td>'
                            _html += '<td>' + response[i].amount + '</td>'
                            _html += '<td>' + response[i].date + '</td>'
                            _html += '</tr>';
                        }
                        $('#WithdrawTablee tbody').html(_html);
                    }
                });
            }
            else {
                debugger
                $("#txtAmount").val('')
                $.notify('Apki Amount bari hai', { globalPosition: 'top center', className: 'error' });
                //toastr.success("Apki Amount bari hai");
            }
        }
        
    });
}


//Delete Transaction
jQueryAjaxDelete = form => {
    if (confirm('Are you sure you want to delete this record?')) {
        try {
            $.ajax({
                type: "POST",
                url: form.action,
                data: new FormData(form),
                contentType: false,
                processData: false,
                success: function (res) {
                    $("#view-all").html(res.html);
                    $.notify('Deleted successfully', { globalPosition: 'top center', className: 'error' });

                },
                error: function (err) {
                    console.log(err);
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
    return false;
}

/*Products wala hissa*/

var showInPopup2 = (url, title) => {
    $.ajax({
        type: "GET",
        url: url,
        success: function (res) {
            debugger
            $("#product-modal .modal-body").html(res);
            $("#product-modal .modal-title").html(title);
            $("#product-modal").modal('show');
         }
    });
}


//AddOrEditProduct

var addOrEditProduct = (Id) => {

    $.ajax({
        type: "GET",
        url: "/Products/AddOrEditProduct",
        data: {
            id:Id
        },
        success: function (res) {
            $("#product-modal .modal-body").html(res);
            $("#product-modal .modal-title").html('Update Product');
            $("#product-modal").modal('show');
        }
    });
}

//Save Product

jQueryAddProduct = form => {

    try {

        $.ajax({
            type: "POST",
            url: form.action,
            data: new FormData(form),
            contentType: false,
            processData: false,

            success: function (res) {
                debugger
                if (res.isValid) {
                    $("#view-all-products").html(res.html);
                    $("#product-modal .modal-body").html('');
                    $("#product-modal .modal-title").html('');
                    $("#product-modal").modal('hide');
                }
                else {
                    $("#product-modal .modal-body").html(res.html);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });

    } catch (e) {
        console.log(e);
    }


    return false;
}

//Delete Product

jQueryDeleteProduct = form => {
    if (confirm('Are you sure you want to delete this product')) {

        try {
            $.ajax({
                type: "POST",
                url: form.action,
                data: new FormData(form),
                contentType: false,
                processData: false,
                success: function (res) {
                    debugger
                    $("#view-all-products").html(res.html);
                    $.notify('Deleted successfully', { globalPosition: 'top center', className: 'warning' });

                },
                error: function (err) {
                    console.log(err);
                }
            });

        } catch (e) {
            console.log(e);
        }
    }
    return false
}
