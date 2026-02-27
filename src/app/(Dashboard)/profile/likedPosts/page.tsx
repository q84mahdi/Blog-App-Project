import LikedPostList from "./_components/LikedPostList";

function UserLikedPostPage() {
  return (
    <div>
      <h1 className="mb-8 text-xl font-bold text-secondary-800">
        لیست پست های پسندیده شده
      </h1>

      <LikedPostList />
    </div>
  );
}

export default UserLikedPostPage;
