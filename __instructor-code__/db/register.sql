insert into auth_user (
    user_email,
    user_password
) values (
    $1,
    $2
)
returning user_id, user_email;