export default function invalidDirectoryName(applicationInstance, notify/*, apiError */) {
  notify.alert('Please enter a valid directory name.', {
    closeAfter: 5000,
  });
}
