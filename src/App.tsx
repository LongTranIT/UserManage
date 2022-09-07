import { useState, useEffect } from "react";
import "./index.css";
import UserService from "./services/user.service";
import { Grid, GridCellProps, GridColumn } from "@progress/kendo-react-grid";
import { User } from "./interfaces";
import { Button } from "@progress/kendo-react-buttons";

import "@progress/kendo-theme-default/dist/all.css";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import {
	Notification,
	NotificationGroup,
} from "@progress/kendo-react-notification";
import FormUser from "./components/FormUser";
const userService = new UserService();

function App() {
	const [users, setUsers] = useState<Array<User>>();
	const [userSelected, setUserSelected] = useState<User>();
	const [visibleDetail, setVisibleDetail] = useState<boolean>(false);
	const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
	const [visibleFormAddUser, setVisibleFormAddUser] = useState<boolean>(false);
	const [visibleFormEditUser, setVisibleFormEditUser] = useState<boolean>(false);
	const [visibleNotifi, setVisibleNotifi] = useState<boolean>(false);

	const toggleDialogDetail = () => {
		setVisibleDetail(!visibleDetail);
	};
	const toggleDialogDelete = () => {
		setVisibleDelete(!visibleDelete);
	};
	const toggleFormAddUser = () => {
		setVisibleFormAddUser(!visibleFormAddUser);
	};
	const toggleFormEditUser = () => {
		setVisibleFormEditUser(!visibleFormEditUser);
	};
	const initData = async () => {
		const data = await userService.getUsers();
		setUsers(data);
	};

	useEffect(() => {
		initData();
	}, []);

	const handleAddUser = (dataItem: { [name: string]: any }) => {
		userService.addUser(dataItem as User)
		toggleFormAddUser()
		setTimeout(initData, 500)
		setVisibleNotifi(true)
		setTimeout(() => {
			setVisibleNotifi(false)
		}, 3000);
	}
	const handleEditUser = (dataItem: { [name: string]: any }) => {
		userService.editUser(userSelected?.id as number, dataItem as User)
		toggleFormEditUser()
		setTimeout(initData, 500)
		setVisibleNotifi(true)
		setTimeout(() => {
			setVisibleNotifi(false)
		}, 3000);
	}

	const handleDeleteUser = () => {
		userService.deleteUser(userSelected?.id as number);
		toggleDialogDelete();
		setTimeout(initData, 500);
		setVisibleNotifi(true)
		setTimeout(() => {
			setVisibleNotifi(false)
		}, 3000);
	}

	const ActionGroup = ({ dataItem }: GridCellProps) => {
		return (
			<td className="k-command-cell flex">
				<Button
					icon={"edit"}
					themeColor={"success"}
					className="mx-4 my-4 px-4"
					fillMode="solid"
					onClick={() => {
						setUserSelected(dataItem);
						toggleFormEditUser();
					}}
				>
					Edit
				</Button>
				<Button
					icon={"delete"}
					themeColor={"primary"}
					className="mx-4 my-4 px-4"
					fillMode="solid"
					onClick={() => {
						setUserSelected(dataItem);
						toggleDialogDelete();
					}}
				>
					Delete
				</Button>
			</td>
		);
	};
	const AddressCell = ({ dataItem }: GridCellProps) => {
		return (
			<td className="k-command-cell">
				{`${dataItem.address.apartment_number} ${dataItem.address.ward} ${dataItem.address.district} ${dataItem.address.city}`}
			</td>
		);
	};
	const DateCell = ({ dataItem }: GridCellProps) => {
		return (
			<td className="k-command-cell">
				{(new Date(dataItem?.date)).toLocaleDateString('vi-VN')}
			</td>
		);
	};

	const DialogDelete = () => {
		return (
			<Dialog title={"Please confirm"} onClose={toggleDialogDelete}>
				<span style={{ margin: "25px", textAlign: "center" }}>
					Are you sure you want to delete {userSelected?.name}?
				</span>
				<DialogActionsBar>
					<Button
						icon={"check"}
						themeColor={"warning"}
						className="my-4"
						fillMode="solid"
						onClick={handleDeleteUser}
					>
						Yes
					</Button>
					<Button
						icon={"close"}
						themeColor={"error"}
						className="my-4"
						fillMode="solid"
						onClick={toggleDialogDelete}
					>
						No
					</Button>
				</DialogActionsBar>
			</Dialog>
		);
	};

	return (
		<div className="App relative">
			<h1 className="flex justify-center bg-violet-300 px-4 py-8 text-red-800">
				User Management
			</h1>

			{visibleDelete && <DialogDelete />}
			{visibleDetail &&
				<Dialog title={"User Detail"} onClose={toggleDialogDetail} >
					<FormUser actionType='detail' defaultData={userSelected} />
				</Dialog>
			}
			{visibleFormAddUser &&
				<Dialog title={"Add User"} onClose={toggleFormAddUser} >
					<FormUser onSubmit={handleAddUser} actionType='add' />
				</Dialog>
			}
			{visibleFormEditUser &&
				<Dialog title={"Edit User"} onClose={toggleFormEditUser} >
					<FormUser onSubmit={handleEditUser} defaultData={userSelected} actionType='edit' />
				</Dialog>
			}

			<div className="flex justify-center">
				<div className="relative">
					{visibleNotifi && (
						<div className="absolute right-0">
							<Notification
								type={{ style: "info", icon: true }}
								closable={true}
								onClose={() => { setVisibleNotifi(false) }}
							>
								<span>Your data has been saved.</span>
							</Notification>
						</div>
					)}
					<Button
						icon={"add"}
						themeColor={"info"}
						className="my-4"
						fillMode="solid"
						onClick={toggleFormAddUser}
					>
						Add
					</Button>
					<Grid
						data={users}
						onRowClick={(dataItem) => {
							toggleDialogDetail();
							setUserSelected(dataItem.dataItem);
						}}
					>
						<GridColumn field="id" title="ID" width="40px" />
						<GridColumn field="name" title="Name" width="200px" />
						<GridColumn field="date" title="Date Of Birth" width="200px" cell={DateCell} />
						<GridColumn
							field="gender"
							title="Gender"
							width="100px"
						/>
						<GridColumn field="email" title="Email" width="200px" />
						<GridColumn field="phone" title="Phone" width="200px" />
						<GridColumn
							field=""
							title="Website"
							width="200px"
							cell={AddressCell}
						/>
						<GridColumn
							field=""
							title="Actions"
							width="200px"
							cell={ActionGroup}
						/>
					</Grid>
				</div>
			</div>
		</div>
	);
}

export default App;
