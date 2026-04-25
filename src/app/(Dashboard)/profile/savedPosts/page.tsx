import SavedPostList from "./_components/SavedPostList";

function UserSavedPostPage() {
  return (
    <div>
      <h1 className="mb-8 text-xl font-bold text-secondary-800">
        لیست پست های ذخیره شده
      </h1>

      <SavedPostList />
    </div>
  );
}

export default UserSavedPostPage;
